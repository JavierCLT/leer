import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const colores = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];

const vocales = ['a', 'e', 'i', 'o', 'u'];
const consonantes = ['m', 'p', 's', 't', 'l', 'n', 'd', 'f', 'ch', 'll', 'j', 'r', 'b', 'h', 'z', 'x', 'c', 'd', 'f', 'g', 'k', 'l', 'qu', 'v', 'y'];

const generarSilaba = () => {
  const consonante = consonantes[Math.floor(Math.random() * consonantes.length)];
  const vocal = vocales[Math.floor(Math.random() * vocales.length)];
  return consonante + vocal;
};

const MetodoLectura = () => {
  const [silaba, setSilaba] = useState('');
  const [colorLetra1, setColorLetra1] = useState('');
  const [colorLetra2, setColorLetra2] = useState('');

  const nuevaSilaba = () => {
    setSilaba(generarSilaba());
    setColorLetra1(colores[Math.floor(Math.random() * colores.length)]);
    setColorLetra2(colores[Math.floor(Math.random() * colores.length)]);
  };

  useEffect(() => {
    nuevaSilaba();
  }, []);

  return (
    <Card className="w-96 mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">Aprendamos a Leer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <span style={{color: colorLetra1, fontSize: '8rem'}}>{silaba[0]}</span>
          <span style={{color: colorLetra2, fontSize: '8rem'}}>{silaba[1]}</span>
        </div>
        <Button onClick={nuevaSilaba} className="w-full">Nueva Sílaba</Button>
      </CardContent>
    </Card>
  );
};

export default MetodoLectura;
