import React, { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import { collection, doc, setDoc } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const RestaurantDatabaseSetup = () => {
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  // Initialize collections
  const collections = {
    admin: {
      name: 'String',
      email: 'String',
      password: 'String',
      created_at: 'Timestamp'
    },
    restaurant_owner: {
      name: 'String',
      email: 'String',
      password: 'String',
      contact_number: 'String',
      registration_date: 'Timestamp'
    },
    restaurant: {
      owner_id: 'Reference',
      name: 'String',
      location: 'String',
      description: 'String',
      total_tables: 'Number',
      empty_tables: 'Number',
      is_closed: 'Boolean',
      contact_details: 'String',
      photo_url: 'String',
      customer_count: 'Number',
      created_at: 'Timestamp',
      updated_at: 'Timestamp'
    },
    table: {
      restaurant_id: 'Reference',
      table_number: 'String',
      seats: 'Number',
      price: 'Number',
      is_occupied: 'Boolean',
      created_at: 'Timestamp'
    },
    customer: {
      name: 'String',
      email: 'String',
      password: 'String',
      contact_number: 'String',
      registration_date: 'Timestamp',
      last_updated: 'Timestamp'
    },
    booking: {
      customer_id: 'Reference',
      table_id: 'Reference',
      restaurant_id: 'Reference',
      ticket_number: 'String',
      booking_date: 'Timestamp',
      booking_time: 'Timestamp',
      status: 'String',
      created_at: 'Timestamp'
    },
    payment: {
      booking_id: 'Reference',
      amount: 'Number',
      payment_status: 'String',
      payment_method: 'String',
      payment_date: 'Timestamp'
    },
    review: {
      customer_id: 'Reference',
      restaurant_id: 'Reference',
      rating: 'Number',
      comment: 'String',
      created_at: 'Timestamp'
    }
  };

  const initializeDatabase = async () => {
    try {
      setStatus('Initializing database...');
      setError('');

      // Create collections and their structure documents
      for (const [collectionName, structure] of Object.entries(collections)) {
        const collectionRef = collection(db, collectionName);
        
        // Add a structure document to define the collection's schema
        await setDoc(doc(collectionRef, '_structure'), {
          fields: structure,
          created_at: new Date(),
          updated_at: new Date()
        });
      }

      setStatus('Database initialized successfully!');
    } catch (err) {
      setError(`Error initializing database: ${err.message}`);
      console.error('Error:', err);
    }
  };

  return (
    <div className="max-w-4xl p-4 mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Management Database Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(collections).map(([name, structure]) => (
                <Card key={name} className="p-4">
                  <h3 className="mb-2 font-bold capitalize">{name}</h3>
                  <div className="text-sm">
                    {Object.entries(structure).map(([field, type]) => (
                      <div key={field} className="grid grid-cols-2 gap-2">
                        <span className="text-gray-600">{field}</span>
                        <span className="text-gray-800">{type}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex flex-col items-center gap-4">
              <Button 
                onClick={initializeDatabase}
                className="w-full max-w-xs"
              >
                Initialize Database
              </Button>

              {status && (
                <Alert>
                  <AlertDescription>{status}</AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantDatabaseSetup;