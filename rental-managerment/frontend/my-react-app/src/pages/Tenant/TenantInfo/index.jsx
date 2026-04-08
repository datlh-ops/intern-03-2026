import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import ProfileView from './components/ProfileView';
import ProfileForm from './components/ProfileForm';

export default function TenantInfo() {
  const { userProfile: user, errorCtx: error, updateProfileContext } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = (updatedUser) => {
    setIsEditing(false);
  };

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Error States matching Layout standard */}
      {error && (
        <div className="bg-rose-50 border-2 border-rose-100 p-8 rounded text-rose-600 font-bold text-center mb-10 shadow-lg shadow-rose-500/10 max-w-2xl mx-auto">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="text-xl mb-2 tracking-tighter">Đã xảy ra lỗi</h3>
          <p className="opacity-80 font-medium">{error}</p>
        </div>
      )}

      {!error && user && (
        <React.Fragment>
          {isEditing ? (
            <ProfileForm
              user={user}
              onSave={handleSave}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <ProfileView
              user={user}
              onEdit={() => setIsEditing(true)}
            />
          )}
        </React.Fragment>
      )}
    </div>
  );
}
