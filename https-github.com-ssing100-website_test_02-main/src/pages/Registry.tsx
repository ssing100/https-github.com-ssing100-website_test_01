import { useState, useEffect, useMemo, FormEvent } from 'react';
import { 
  Plus, 
  Search, 
  Car as CarIcon, 
  Trash2, 
  Edit3, 
  X, 
  Filter, 
  ArrowRight, 
  LogOut, 
  LogIn,
  AlertCircle,
  Loader2,
  Calendar,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { onAuthStateChanged, User } from 'firebase/auth';
import { 
  db, 
  auth, 
  signIn, 
  logOut, 
  serverTimestamp, 
  OperationType, 
  handleFirestoreError 
} from '../lib/firebase';
import { Car, CarFormData } from '../types';

const INITIAL_FORM: CarFormData = {
  make: '',
  model: '',
  year: new Date().getFullYear(),
  price: 0
};

export default function Registry() {
  const [user, setUser] = useState<User | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);
  const [formData, setFormData] = useState<CarFormData>(INITIAL_FORM);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filters
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [makeFilter, setMakeFilter] = useState<string>('all');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (u) => {
      setUser(u);
    });

    const q = query(collection(db, 'cars'), orderBy('createdAt', 'desc'));
    const unsubscribeCars = onSnapshot(q, 
      (snapshot) => {
        const carsData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Car[];
        setCars(carsData);
        setLoading(false);
      },
      (err) => {
        if (err.code !== 'permission-denied' || auth.currentUser) {
           handleFirestoreError(err, OperationType.LIST, 'cars');
        }
        setLoading(false);
      }
    );

    return () => {
      unsubscribeAuth();
      unsubscribeCars();
    };
  }, []);

  const makes = useMemo(() => {
    return Array.from(new Set(cars.map(c => c.make))).sort();
  }, [cars]);

  const years = useMemo(() => {
    return Array.from(new Set(cars.map(c => c.year))).sort((a, b) => (b as number) - (a as number));
  }, [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = 
        car.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMake = makeFilter === 'all' || car.make === makeFilter;
      const matchesYear = yearFilter === 'all' || car.year.toString() === yearFilter;
      return matchesSearch && matchesMake && matchesYear;
    });
  }, [cars, searchTerm, makeFilter, yearFilter]);

  const stats = useMemo(() => {
    const totalAssets = cars.reduce((acc, car) => acc + car.price, 0);
    const unitCount = cars.length;
    const topPerformance = cars.length > 0 
      ? cars.reduce((prev, current) => (prev.price > current.price) ? prev : current)
      : null;
    const avgYear = cars.length > 0
      ? Math.round(cars.reduce((acc, car) => acc + car.year, 0) / cars.length)
      : 0;
    
    return { totalAssets, unitCount, topPerformance, avgYear };
  }, [cars]);

  const handleCreateOrUpdate = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setIsSubmitting(true);
    setError(null);

    try {
      if (editingCar) {
        const carDocId = editingCar.id;
        await updateDoc(doc(db, 'cars', carDocId), {
          ...formData,
          updatedAt: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, 'cars'), {
          ...formData,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
      setEditingCar(null);
      setFormData(INITIAL_FORM);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, 'cars');
      setError("Failed to save car information. Please check requirements.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!user || !window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await deleteDoc(doc(db, 'cars', id));
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `cars/${id}`);
    }
  };

  const openEditModal = (car: Car) => {
    setEditingCar(car);
    setFormData({
      make: car.make,
      model: car.model,
      year: car.year,
      price: car.price
    });
    setIsModalOpen(true);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-[#e0e0e0] font-sans flex flex-col pt-24 p-4 sm:p-8 overflow-x-hidden">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-6 mb-8 gap-6">
        <div className="space-y-1">
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#888] font-semibold">Inventory Management</p>
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-4xl font-serif italic text-amber-500"
          >
            Vehicle Records Database
          </motion.h1>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:flex-none">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#555]" />
            <input 
              type="text" 
              placeholder="Search make, model..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-sm py-2 pl-10 pr-4 w-full md:w-64 text-sm focus:outline-none focus:border-amber-500 placeholder:text-[#555] transition-all" 
            />
          </div>
          
          {user ? (
            <div className="flex items-center gap-4">
              <button 
                onClick={() => {
                  setEditingCar(null);
                  setFormData(INITIAL_FORM);
                  setIsModalOpen(true);
                }}
                className="bg-amber-500 text-black px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-amber-400 transition-colors whitespace-nowrap"
              >
                + Add Entry
              </button>
              <button 
                onClick={logOut}
                className="text-[#888] hover:text-red-500 transition-colors"
                title="Sign Out"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <button 
              onClick={signIn}
              className="border border-amber-500 text-amber-500 px-6 py-2 rounded-sm text-sm font-bold uppercase tracking-wider hover:bg-amber-500 hover:text-black transition-all"
            >
              Admin Access
            </button>
          )}
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/5 border border-white/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#666] mb-2">Total Asset Value</p>
          <p className="text-2xl font-serif">{formatCurrency(stats.totalAssets)}</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/5 border border-white/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#666] mb-2">Unit Count</p>
          <p className="text-2xl font-serif">{stats.unitCount} Vehicles</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white/5 border border-white/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#666] mb-2">Top Performer</p>
          <p className="text-xl font-serif truncate" title={stats.topPerformance ? `${stats.topPerformance.make} ${stats.topPerformance.model}` : 'N/A'}>
            {stats.topPerformance ? `${stats.topPerformance.make} ${stats.topPerformance.model}` : 'N/A'}
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white/5 border border-white/10 p-5 rounded-sm">
          <p className="text-[10px] uppercase tracking-widest text-[#666] mb-2">Avg. Release Year</p>
          <p className="text-2xl font-serif text-amber-500">{stats.avgYear || 'N/A'}</p>
        </motion.div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 items-center">
        <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#555]">Sort & Filter</div>
        <select 
          value={makeFilter}
          onChange={(e) => setMakeFilter(e.target.value)}
          className="bg-white/5 border border-white/10 text-xs text-[#888] px-3 py-2 rounded-sm focus:outline-none focus:border-amber-500"
        >
          <option value="all">Every Manufacturer</option>
          {makes.map(m => <option key={m} value={m}>{m}</option>)}
        </select>
        <select 
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="bg-white/5 border border-white/10 text-xs text-[#888] px-3 py-2 rounded-sm focus:outline-none focus:border-amber-500"
        >
          <option value="all">Production Year</option>
          {years.map(y => <option key={y} value={y.toString()}>{y}</option>)}
        </select>
      </div>

      <div className="flex-1 bg-black border border-white/10 rounded-sm flex flex-col min-h-[400px]">
        <div className="grid grid-cols-12 bg-white/5 border-b border-white/10 text-[11px] uppercase tracking-[0.2em] font-bold text-[#888] py-4 px-6 gap-4">
          <div className="col-span-3">Make</div>
          <div className="col-span-3">Model</div>
          <div className="col-span-1 hidden sm:block">Year</div>
          <div className="col-span-2">Value</div>
          <div className="col-span-1 text-center hidden md:block">Status</div>
          <div className="col-span-2 text-right">Actions</div>
        </div>

        <div className="flex-1 divide-y divide-white/5 overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredCars.map((car) => (
              <motion.div
                layout
                key={car.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-12 items-center py-4 px-6 text-sm hover:bg-white/5 transition-colors gap-4"
              >
                <div className="col-span-3 font-serif italic text-lg text-white">{car.make}</div>
                <div className="col-span-3 text-[#ccc] truncate">{car.model}</div>
                <div className="col-span-1 font-mono text-xs opacity-60 hidden sm:block">{car.year}</div>
                <div className="col-span-2 font-serif text-amber-500">{formatCurrency(car.price)}</div>
                <div className="col-span-1 text-center hidden md:block text-[10px]">
                   <span className="bg-green-950/30 text-green-400 px-2 py-0.5 rounded-full uppercase tracking-tighter">Verified</span>
                </div>
                <div className="col-span-2 text-right flex justify-end gap-3">
                  {user ? (
                    <>
                      <button onClick={() => openEditModal(car)} className="text-[#555] hover:text-amber-500 transition-colors">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(car.id)} className="text-[#555] hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] font-mono text-[#444] uppercase tracking-widest">Read Only</span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-950 border border-white/10 rounded-sm shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-white/10 flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-serif italic text-amber-500">
                    {editingCar ? 'Update Record' : 'Create Entry'}
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-[#666] mt-1">Vehicle Specification Module</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="text-[#444] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateOrUpdate} className="p-8 space-y-6">
                {error && (
                  <div className="flex items-center gap-3 p-3 bg-red-950/20 text-red-400 rounded-sm border border-red-900/50 text-[11px] font-mono uppercase tracking-wider">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                  </div>
                )}

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#666]">Manufacturer (Make)</label>
                    <input 
                      required
                      type="text"
                      value={formData.make}
                      onChange={(e) => setFormData({ ...formData, make: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-[#666]">Vehicle Model</label>
                    <input 
                      required
                      type="text"
                      value={formData.model}
                      onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-sm focus:outline-none focus:border-amber-500 text-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#666]">Release Year</label>
                      <input 
                        required
                        type="number"
                        min="1886"
                        max="2100"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-sm focus:outline-none focus:border-amber-500 text-white font-mono"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-widest text-[#666]">Valuation (USD)</label>
                      <input 
                        required
                        type="number"
                        min="0"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                        className="w-full bg-white/5 border border-white/10 rounded-sm p-3 text-sm focus:outline-none focus:border-amber-500 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col gap-3">
                  <button 
                    disabled={isSubmitting}
                    type="submit"
                    className="w-full bg-amber-500 text-black py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-amber-400 transition-colors flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      editingCar ? 'Update Registry' : 'Commit to Database'
                    )}
                  </button>
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-transparent border border-white/10 text-[#666] py-3 rounded-sm font-bold uppercase tracking-widest hover:text-white transition-all"
                  >
                    Abort Changes
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
