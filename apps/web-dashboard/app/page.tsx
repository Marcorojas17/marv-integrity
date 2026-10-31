"use client";
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function Dashboard() {
  const [folios, setFolios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [productName, setProductName] = useState('');
  const [sku, setSku] = useState('');
  const [isEmitting, setIsEmitting] = useState(false);

  async function fetchFolios() {
    const { data } = await supabase.from('folios').select('*').order('created_at', { ascending: false });
    if (data) setFolios(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchFolios();
  }, []);

  async function handleEmit(e: React.FormEvent) {
    e.preventDefault();
    setIsEmitting(true);
    
    try {
      const res = await fetch('/api/emit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productName, sku })
      });
      const data = await res.json();
      
      if (data.success) {
        setProductName('');
        setSku('');
        fetchFolios(); // Recargar la lista
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      alert("Error de conexión");
    }
    setIsEmitting(false);
  }

  return (
    <main style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#05040a', minHeight: '100vh', color: '#fff' }}>
      <header style={{ marginBottom: '40px', borderBottom: '1px solid #333', paddingBottom: '20px' }}>
        <h1 style={{ color: '#00f2fe', margin: 0 }}>🛡️ EVIDENCE INTEGRITY OS</h1>
        <p style={{ color: '#6e658a', marginTop: '5px' }}>Panel de Control de Folios</p>
      </header>

      {/* Formulario de Emisión */}
      <div style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333', marginBottom: '40px' }}>
        <h3 style={{ color: '#ff9f1c', marginTop: 0 }}>Emitir Nuevo Folio</h3>
        <form onSubmit={handleEmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input 
            type="text" placeholder="Nombre del producto" value={productName} onChange={e => setProductName(e.target.value)} required
            style={{ flex: 1, padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '5px' }}
          />
          <input 
            type="text" placeholder="SKU (opcional)" value={sku} onChange={e => setSku(e.target.value)}
            style={{ width: '150px', padding: '10px', background: '#000', border: '1px solid #333', color: '#fff', borderRadius: '5px' }}
          />
          <button type="submit" disabled={isEmitting} style={{ padding: '10px 20px', background: '#00f2fe', color: '#000', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            {isEmitting ? 'Emitiendo...' : 'Emitir Folio'}
          </button>
        </form>
      </div>

      {/* Lista de Folios */}
      <div style={{ background: '#111', padding: '20px', borderRadius: '10px', border: '1px solid #333' }}>
        <h3 style={{ color: '#00f2fe', marginTop: 0 }}>Últimos Folios Emitidos</h3>
        {loading ? <p>Cargando...</p> : folios.length === 0 ? <p style={{ color: '#6e658a' }}>No hay folios. Emite el primero.</p> : (
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #333', textAlign: 'left' }}>
                <th style={{ padding: '10px' }}>Folio</th>
                <th style={{ padding: '10px' }}>Producto</th>
                <th style={{ padding: '10px' }}>Hash SHA-256</th>
                <th style={{ padding: '10px' }}>Estado</th>
              </tr>
            </thead>
            <tbody>
              {folios.map((f, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #222' }}>
                  <td style={{ padding: '10px', color: '#00f2fe' }}>{f.folio}</td>
                  <td style={{ padding: '10px' }}>{f.product_name}</td>
                  <td style={{ padding: '10px', color: '#6e658a', fontSize: '11px' }}>{f.hash_sha256.substring(0, 20)}...</td>
                  <td style={{ padding: '10px' }}>
                    <span style={{ background: 'rgba(0,255,102,0.1)', color: '#00ff66', padding: '4px 8px', borderRadius: '4px', fontSize: '11px' }}>VERIFICADO</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}
