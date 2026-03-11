export const EmptyState = () => (
  <div className="empty-state" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
    <svg 
      className="empty-icon"
      style={{ 
        width: '96px', 
        height: '96px', 
        margin: '0 auto 1.5rem',
        opacity: 0.3 
      }}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={1} 
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
      />
    </svg>
    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', margin: '0 0 0.5rem 0' }}>
      Keine Ergebnisse
    </h3>
    <p style={{ margin: 0, opacity: 0.6 }}>Versuche einen anderen Suchbegriff</p>
  </div>
);
