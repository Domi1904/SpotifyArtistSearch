export const LoadingSpinner = () => (
  <div className="loading" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
    <div 
      className="loading-spinner"
      style={{
        width: '48px',
        height: '48px',
        border: '4px solid rgba(255,255,255,0.2)',
        borderTop: '4px solid #a855f7',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite',
        margin: '0 auto 1rem'
      }}
    />
    <p style={{ fontSize: '1.25rem', margin: 0 }}>Suche läuft...</p>
  </div>
);
