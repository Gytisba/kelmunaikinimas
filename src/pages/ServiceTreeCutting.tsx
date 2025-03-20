
import ServiceLayout from "@/components/ServiceLayout";

const ServiceTreeCutting = () => {
  return (
    <ServiceLayout 
      title="Pavojingų medžių pjovimas ir genėjimas"
      imageSrc="https://images.unsplash.com/photo-1517899411004-6e63eb24349b?auto=format&fit=crop&w=1000&q=80"
    >
      <h2 className="text-2xl font-bold text-forest-700 mb-4">Profesionalus pavojingų medžių pjovimas ir genėjimas</h2>
      
      <p className="mb-6">
        Patikėkite savo medžių priežiūrą profesionalams! Mūsų sertifikuoti arboristai saugiai ir
        atsakingai atlieka:
      </p>
      
      <ul className="space-y-2 mb-6">
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✅</span>
          <span>Pavojingų medžių pjovimą net ir sudėtingose vietose</span>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✅</span>
          <span>Medžių genėjimą, formavimą ir šakų šalinimą</span>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✅</span>
          <span>Sausų, pažeistų ar ligotų medžių tvarkymą</span>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✅</span>
          <span>Medžių priežiūrą sunkiai pasiekiamose vietose</span>
        </li>
      </ul>
      
      <p className="font-semibold text-lg text-forest-700">
        Moderni įranga + patirtis = saugus ir kokybiškas darbas!
      </p>
      
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-forest-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-forest-700 mb-3">Kodėl verta rinktis mus?</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">•</span>
              <span>Sertifikuoti arboristai su ilgamete patirtimi</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">•</span>
              <span>Moderni ir saugi įranga</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">•</span>
              <span>Šiuolaikinis požiūris į medžių priežiūrą</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">•</span>
              <span>Konkurencingos kainos</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-forest-50 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-forest-700 mb-3">Mūsų darbo procesas</h3>
          <ol className="space-y-2">
            <li className="flex items-start">
              <span className="text-forest-500 mr-2 font-bold">1.</span>
              <span>Nemokama konsultacija ir apžiūra</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2 font-bold">2.</span>
              <span>Detalus darbų planas ir kainų pasiūlymas</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2 font-bold">3.</span>
              <span>Saugus ir efektyvus darbų atlikimas</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2 font-bold">4.</span>
              <span>Teritorijos sutvarkymas po darbų</span>
            </li>
          </ol>
        </div>
      </div>
    </ServiceLayout>
  );
};

export default ServiceTreeCutting;
