import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonItem, IonText, IonLabel, IonListHeader, IonList, IonLoading } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [vin, setVin] = useState<string>('');
  const [vehicleData, setVehicleData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [invalidChars, setInvalidChars] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const DECODER_API_URL = import.meta.env.VITE_DECODER_API_URL;

  const validateVIN = (vin: string) => {
    const invalidCharRegex = /[^A-HJ-NPR-Z0-9]/gi;
    const invalidCharsFound = vin.match(invalidCharRegex);
    setInvalidChars(invalidCharsFound || []);

    const vinRegex = /^[A-HJ-NPR-Z0-9]{17}$/;
    return vinRegex.test(vin);
  };

  const handleDecode = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
  
    validateVIN(vin);
 
    if (invalidChars.length) return;

    setVehicleData(null);
    setLoading(true);

    try {
      const response = await fetch(`${DECODER_API_URL}?vin=${vin}`);
      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setVehicleData(data);
      }
    } catch (err) {
      setError('Error fetching vehicle data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>VIN Decoder</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonLoading
          isOpen={loading}
          message={'Loading...'}
        />
        <form onSubmit={handleDecode}>
          <IonItem>
            <IonLabel position="stacked">VIN</IonLabel>
            <IonInput 
              value={vin} 
              onIonChange={e => {
                setVin(e.detail.value!);
                validateVIN(e.detail.value!);
              }}
              minlength={17}
              maxlength={17}
              required
            ></IonInput>
          </IonItem>
          {invalidChars.length > 0 && (
            <IonText color="danger">
              Invalid characters: {invalidChars.join(', ')}
            </IonText>
          )}
          {error && <IonText color="danger">{error}</IonText>}
          <IonButton type="submit" expand="full">Decode</IonButton>
        </form>
        {vehicleData && (
          <IonList>
            <IonListHeader>
              <IonLabel>Vehicle Information</IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel>Manufacturer: {vehicleData.manufacturer}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Vehicle Type: {vehicleData.vehicleType}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Model Year: {vehicleData.modelYear}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Make: {vehicleData.make}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Model: {vehicleData.model}</IonLabel>
            </IonItem>
            <IonItem>
              <IonLabel>Body Class: {vehicleData.bodyClass}</IonLabel>
            </IonItem>

            <IonListHeader>
              <IonLabel>Other Information</IonLabel>
            </IonListHeader>
            {Object.entries(vehicleData.otherInformation).map(([key, value]) => {
              if (key !== 'airbags') {
                return (
                  <IonItem key={key}>
                    <IonLabel>{key}: {key}: {String(value) || 'N/A'}</IonLabel>
                  </IonItem>
                );
              }
              return null;
            })}

            <IonListHeader>
              <IonLabel>Airbags Information</IonLabel>
            </IonListHeader>
            {Object.entries(vehicleData.otherInformation.airbags).map(([key, value]) => (
              <IonItem key={key} lines="none">
                <IonLabel>
                  <div style={{ paddingLeft: '10px' }}>
                    {key}: {key}: {String(value) || 'N/A'}
                  </div>
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Home;
