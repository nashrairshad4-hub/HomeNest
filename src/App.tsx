import React, { useState, useEffect } from 'react';
import { Property, User, Inquiry, FilterState } from './types';
import { initialProperties, initialUsers, initialInquiries } from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { PropertiesPage } from './components/PropertiesPage';
import { PropertyDetailsPage } from './components/PropertyDetailsPage';
import { SellPage } from './components/SellPage';
import { DashboardPage } from './components/DashboardPage';
import { AdminPage } from './components/AdminPage';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AuthModal } from './components/AuthModal';
import { FlaskCodeViewer } from './components/FlaskCodeViewer';

export default function App() {
  // 1. Persistent State
  const [properties, setProperties] = useState<Property[]>(() => {
    const saved = localStorage.getItem('homenest_properties');
    return saved ? JSON.parse(saved) : initialProperties;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('homenest_users');
    return saved ? JSON.parse(saved) : initialUsers;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('homenest_current_user');
    return saved ? JSON.parse(saved) : initialUsers[1]; // Default to Bilal Irshad for testing
  });

  const [favorites, setFavorites] = useState<number[]>(() => {
    const saved = localStorage.getItem('homenest_favorites');
    return saved ? JSON.parse(saved) : [1, 3];
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('homenest_inquiries');
    return saved ? JSON.parse(saved) : initialInquiries;
  });

  // 2. Navigation & UI State
  const [activePage, setActivePage] = useState<string>('home');
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [activeFilters, setActiveFilters] = useState<Partial<FilterState>>({});
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isFlaskCodeOpen, setIsFlaskCodeOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('homenest_properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('homenest_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('homenest_current_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('homenest_current_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('homenest_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('homenest_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Handlers
  const handleToggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  const handleSelectProperty = (prop: Property) => {
    setSelectedProperty(prop);
    setActivePage('property_details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToProperties = (filters?: Partial<FilterState>) => {
    if (filters) {
      setActiveFilters(filters);
    } else {
      setActiveFilters({});
    }
    setActivePage('properties');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddProperty = (newPropData: Omit<Property, 'id' | 'createdAt'>) => {
    const newProp: Property = {
      ...newPropData,
      id: Date.now(),
      createdAt: new Date().toISOString().split('T')[0],
    };
    setProperties([newProp, ...properties]);
  };

  const handleTogglePropertyStatus = (id: number) => {
    setProperties(
      properties.map((p) => {
        if (p.id === id) {
          return {
            ...p,
            status: p.status === 'Available' ? 'Sold' : 'Available',
          };
        }
        return p;
      })
    );
  };

  const handleDeleteProperty = (id: number) => {
    if (window.confirm('Are you sure you want to delete this property listing?')) {
      setProperties(properties.filter((p) => p.id !== id));
    }
  };

  const handleSubmitInquiry = (inquiryData: Omit<Inquiry, 'id' | 'createdAt'>) => {
    const newInq: Inquiry = {
      ...inquiryData,
      id: Date.now(),
      createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
    };
    setInquiries([newInq, ...inquiries]);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleRegister = (newUser: User) => {
    setUsers([...users, newUser]);
    setCurrentUser(newUser);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    if (activePage === 'admin' || activePage === 'dashboard') {
      setActivePage('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      
      {/* Top Navbar */}
      <Navbar
        currentUser={currentUser}
        activePage={activePage}
        setActivePage={(page) => {
          if (page === 'properties') setActiveFilters({});
          setActivePage(page);
        }}
        favoritesCount={favorites.length}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenFlaskCode={() => setIsFlaskCodeOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {activePage === 'home' && (
          <HomePage
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={handleSelectProperty}
            onNavigateToProperties={handleNavigateToProperties}
            onNavigateToSell={() => {
              setActivePage('sell');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToContact={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'properties' && (
          <PropertiesPage
            properties={properties}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={handleSelectProperty}
            initialFilters={activeFilters}
          />
        )}

        {activePage === 'property_details' && selectedProperty && (
          <PropertyDetailsPage
            property={selectedProperty}
            allProperties={properties}
            favorites={favorites}
            currentUser={currentUser}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={handleSelectProperty}
            onBack={() => {
              setActivePage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSubmitInquiry={handleSubmitInquiry}
          />
        )}

        {activePage === 'sell' && (
          <SellPage
            currentUser={currentUser}
            onAddProperty={(newP) => {
              handleAddProperty(newP);
            }}
            onOpenAuth={() => setIsAuthOpen(true)}
          />
        )}

        {activePage === 'dashboard' && currentUser && (
          <DashboardPage
            currentUser={currentUser}
            properties={properties}
            favorites={favorites}
            inquiries={inquiries}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={handleSelectProperty}
            onDeleteProperty={handleDeleteProperty}
            onTogglePropertyStatus={handleTogglePropertyStatus}
            onNavigateToSell={() => {
              setActivePage('sell');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'favorites' && (
          <DashboardPage
            currentUser={currentUser || initialUsers[1]}
            properties={properties}
            favorites={favorites}
            inquiries={inquiries}
            onToggleFavorite={handleToggleFavorite}
            onSelectProperty={handleSelectProperty}
            onDeleteProperty={handleDeleteProperty}
            onTogglePropertyStatus={handleTogglePropertyStatus}
            onNavigateToSell={() => {
              setActivePage('sell');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage
            properties={properties}
            users={users}
            inquiries={inquiries}
            onTogglePropertyStatus={handleTogglePropertyStatus}
            onDeleteProperty={handleDeleteProperty}
            onSelectProperty={handleSelectProperty}
            onNavigateToSell={() => {
              setActivePage('sell');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'about' && (
          <AboutPage
            onNavigateToProperties={() => {
              setActivePage('properties');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onNavigateToContact={() => {
              setActivePage('contact');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'contact' && <ContactPage />}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={(page, filter) => {
          if (filter) {
            handleNavigateToProperties(filter);
          } else {
            setActivePage(page);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        onOpenFlaskCode={() => setIsFlaskCodeOpen(true)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLogin={handleLogin}
        onRegister={handleRegister}
        existingUsers={users}
      />

      {/* Python Flask Source Code & Deployment Architecture Viewer */}
      <FlaskCodeViewer
        isOpen={isFlaskCodeOpen}
        onClose={() => setIsFlaskCodeOpen(false)}
      />

    </div>
  );
}
