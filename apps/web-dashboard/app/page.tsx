export default function Dashboard() {
  return (
    <main style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ color: '#00f2fe', margin: 0 }}>■_□ MARV ○_●</h1>
        <p style={{ color: '#888' }}>Dashboard Enterprise · KRONOS SUPERIOR</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        <div style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ color: '#888', margin: '0 0 10px 0', fontSize: '14px' }}>FOLIOS EMITIDOS</h3>
          <p style={{ fontSize: '32px', margin: 0, color: '#fff' }}>1,330</p>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ color: '#888', margin: '0 0 10px 0', fontSize: '14px' }}>VERIFICACIONES</h3>
          <p style={{ fontSize: '32px', margin: 0, color: '#00f2fe' }}>892,451</p>
        </div>
        <div style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
          <h3 style={{ color: '#888', margin: '0 0 10px 0', fontSize: '14px' }}>ESTADO DEL SISTEMA</h3>
          <p style={{ fontSize: '32px', margin: 0, color: '#00ff66' }}>ONLINE</p>
        </div>
      </div>

      <div style={{ marginTop: '40px', background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
        <h3>Últimos Folios Emitidos</h3>
        <p style={{ color: '#888' }}>Esperando conexión con la base de datos (Supabase)...</p>
      </div>
    </main>
  )
}
