
import ServiceLayout from "@/components/ServiceLayout";

const ServiceIndustrialClimbing = () => {
  return (
    <ServiceLayout 
      title="Pramoninis alpinizmas"
      imageSrc="https://sxzpjfqdxpeyksfmjqii.supabase.co/storage/v1/object/public/project_images//pramoninis.jpg"
      overlayColor="from-slate-900/60"
    >
      <h2 className="text-2xl font-bold text-forest-700 mb-4">Pramoninis alpinizmas: veikla, pritaikymas ir svarba</h2>
      
      <p className="mb-6">
        Pramoninis alpinizmas – tai specializuota veikla, kurios metu naudojant virvių technologijas
        atliekami įvairūs darbai sunkiai pasiekiamose vietose. Tai apima aukštuminius darbus be
        tradicinių pastolių ar keltuvų, naudojant profesionalią alpinistinę įrangą ir specialius darbo
        metodus.
      </p>
      
      <h3 className="text-xl font-bold text-forest-700 mb-3">Pritaikymas</h3>
      
      <p className="mb-3">
        Pramoninis alpinizmas yra plačiai naudojamas šiose srityse:
      </p>
      
      <ul className="space-y-3 mb-6">
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 font-bold">•</span>
          <p><strong>Statybos ir priežiūra</strong> – aukštų pastatų, tiltų, bokštų, vėjo jėgainių remontas, priežiūra ir plovimas.</p>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 font-bold">•</span>
          <p><strong>Fasadų valymas ir dažymas</strong> – stiklinių dangų, sienų plovimas, renovacija ir dažymas.</p>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 font-bold">•</span>
          <p><strong>Pramonės objektų priežiūra</strong> – gamyklų, naftos platformų, dūmtraukių ir kitų objektų patikra bei remontas.</p>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 font-bold">•</span>
          <p><strong>Montavimo darbai</strong> – reklaminių iškabų, švieslenčių, antenų, elektros instaliacijų tvirtinimas.</p>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 font-bold">•</span>
          <p><strong>Gamtosaugos projektai</strong> – kalnų ar uolų tvirtinimas, medžių genėjimas ir apsauga nuo griūčių.</p>
        </li>
      </ul>
      
      <h3 className="text-xl font-bold text-forest-700 mb-3">Svarba ir nauda</h3>
      
      <p className="mb-6">
        Pramoninis alpinizmas leidžia efektyviai atlikti sudėtingus darbus dideliame aukštyje, kur
        tradicinės priemonės būtų per brangios ar nepraktiškos. Tai ekonomiškas, lankstus ir saugus
        metodas, reikalaujantis aukštos kvalifikacijos specialistų.
      </p>
      
      <div className="bg-forest-50 p-6 rounded-lg mb-6">
        <h4 className="text-lg font-bold text-forest-700 mb-3">Mūsų pramoninio alpinizmo paslaugos:</h4>
        <ul className="space-y-2">
          <li className="flex items-start">
            <span className="text-forest-500 mr-2">✓</span>
            <span>Aukštybiniai darbai pastatuose ir statiniuose</span>
          </li>
          <li className="flex items-start">
            <span className="text-forest-500 mr-2">✓</span>
            <span>Fasadų ir langų valymas dideliame aukštyje</span>
          </li>
          <li className="flex items-start">
            <span className="text-forest-500 mr-2">✓</span>
            <span>Aukštų medžių genėjimas ir tvarkymas</span>
          </li>
          <li className="flex items-start">
            <span className="text-forest-500 mr-2">✓</span>
            <span>Montavimo darbai sunkiai prieinamose vietose</span>
          </li>
          <li className="flex items-start">
            <span className="text-forest-500 mr-2">✓</span>
            <span>Specialūs darbai pramoniniuose objektuose</span>
          </li>
        </ul>
      </div>
      
      <p className="font-semibold text-lg text-forest-700">
        Teikiame saugias ir efektyvias pramoninio alpinizmo paslaugas visoje Lietuvoje!
      </p>
    </ServiceLayout>
  );
};

export default ServiceIndustrialClimbing;
