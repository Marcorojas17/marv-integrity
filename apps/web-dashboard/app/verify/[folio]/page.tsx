"use client";
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useParams } from 'next/navigation';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function VerifyFolio() {
  const params = useParams();
  const folioId = params.folio as string;
  
  const [loading, setLoading] = useState(true);
  const [folio, setFolio] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function checkFolio() {
      if (!folioId) return;
      
      const { data, error } = await supabase
        .from('folios')
        .select('*')
        .eq('folio', folioId)
        .single();
        
      if (error || !data) {
        setError(true);
      } else {
        setFolio(data);
      }
      setLoading(false);
    }
    checkFolio();
  }, [folioId]);

  if (loading) {
    return <div style={{ background: '#05040a', color: '#00f2fe', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'monospace' }}>ESCANEANDO RED KRONOS...</div>;
  }

  return (
    <main style={{ padding: '40px', fontFamily: 'monospace', backgroundColor: '#05040a', minHeight: '100vh', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      <h1 style={{ color: '#00f2fe', marginBottom: '40px', letterSpacing: '2px' }}>🛡️ EVIDENCE INTEGRITY OS</h1>

      {error ? (
        <div style={{ background: 'rgba(255,0,85,0.1)', border: '2px solid #ff0055', padding: '40px', borderRadius: '10px', textAlign: 'center', maxWidth: '500px', width: '100%' }}>
          <h2 style={{ color: '#ff0055', margin: '0 0 20px 0', fontSize: '32px' }}>❌ ALERTA: CLON</h2>
          <p style={{ color: '#fff', fontSize: '14px' }}>El folio <strong>{folioId}</strong> no existe en la base de datos de KRONOS o ha sido revocado.</p>
          <p style={{ color: '#6e658a', fontSize: '12px', marginTop: '20px' }}>Este producto podría ser falsificado. Proceda con precaución.</p>
        </div>
      ) : (
        <div style={{ background: 'rgba(0,255,102,0.05)', border: '2px solid #00ff66', padding: '40px', borderRadius: '10px', textAlign: 'center', maxWidth: '500px', width: '100%', boxShadow: '0 0 30px rgba(0,255,102,0.1)' }}>
          <h2 style={{ color: '#00ff66', margin: '0 0 20px 0', fontSize: '32px' }}>✅ VERIFICADO</h2>
          <p style={{ color: '#fff', marginBottom: '30px' }}>Evidencia auténtica registrada en el ecosistema.</p>
          
          <div style={{ textAlign: 'left', fontSize: '13px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
            <p style={{ margin: '10px 0' }}><span style={{ color: '#6e658a' }}>Folio:</span> <strong>{folio.folio}</strong></p>
            <p style={{ margin: '10px 0' }}><span style={{ color: '#6e658a' }}>Producto:</span> {folio.product_name}</p>
            <p style={{ margin: '10px 0' }}><span style={{ color: '#6e658a' }}>SKU:</span> {folio.sku}</p>
            <p style={{ margin: '10px 0', wordBreak: 'break-all' }}><span style={{ color: '#6e658a' }}>Hash SHA-256:</span> <br/><span style={{ color: '#00f2fe', fontSize: '11px' }}>{folio.hash_sha256}</span></p>
            <p style={{ margin: '10px 0' }}><span style={{ color: '#6e658a' }}>Fecha:</span> {new Date(folio.created_at).toLocaleString()}</p>
          </div>
        </div>
      )}

      <p style={{ color: '#6e658a', fontSize: '11px', marginTop: '40px' }}>Powered by KRONOS ARKHE ZERO · 2026</p>
    </main>
  );
}
