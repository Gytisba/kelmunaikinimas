
import ServiceLayout from "@/components/ServiceLayout";

const ServiceStumpGrinding = () => {
  return (
    <ServiceLayout 
      title="Kelmų frezavimas"
      imageSrc="public/lovable-uploads/535eb57c-eb4b-454f-aac8-6798ca65f763.png"
      overlayColor="from-earth-900/60"
    >
      <h2 className="text-2xl font-bold text-forest-700 mb-4">Kelmų frezavimas su freza: procesas ir nauda</h2>
      
      <p className="mb-6">
        Kelmų frezavimas – tai efektyvus ir ekologiškas būdas pašalinti medžių kelmus iš teritorijos
        naudojant specialią frezą. Šis metodas leidžia greitai ir saugiai atsikratyti nereikalingų kelmų be
        didelių kasimo darbų.
      </p>
      
      <h3 className="text-xl font-bold text-forest-700 mb-3">Kelmų frezavimo procesas:</h3>
      
      <ol className="space-y-4 mb-6">
        <li>
          <p className="font-semibold mb-1">1. Pasiruošimas darbui</p>
          <ul className="space-y-1 pl-6">
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Nustatoma kelmo vieta ir dydis.</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Patikrinama, ar nėra po žeme elektros laidų, vamzdynų ar kitų kliūčių.</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Aplink darbo vietą pašalinamos trukdančios šakos, akmenys ir kitos kliūtys.</span>
            </li>
          </ul>
        </li>
        
        <li>
          <p className="font-semibold mb-1">2. Frezavimo atlikimas</p>
          <ul className="space-y-1 pl-6">
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Naudojama speciali kelmų freza su greitai besisukančiais pjovimo ašmenimis.</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Freza palaipsniui smulkina kelmą iki požeminio lygio (dažniausiai iki 20–40 cm gylio).</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Susidariusios medžio drožlės paliekamos kaip natūrali mulčiavimo medžiaga arba išvežamos.</span>
            </li>
          </ul>
        </li>
        
        <li>
          <p className="font-semibold mb-1">3. Baigiamieji darbai</p>
          <ul className="space-y-1 pl-6">
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Išlyginta vieta gali būti apsėjama veja arba pasiruošiama tolimesniems darbams.</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest-500 mr-2">○</span>
              <span>Atliekų tvarkymas – priklausomai nuo kliento poreikių, drožlės gali būti naudojamos kaip trąša arba pašalinamos.</span>
            </li>
          </ul>
        </li>
      </ol>
      
      <h3 className="text-xl font-bold text-forest-700 mb-3">Kelmų frezavimo privalumai:</h3>
      
      <ul className="space-y-2 mb-6">
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✔️</span>
          <span>Greitas ir efektyvus būdas pašalinti kelmus be didelio žemės kasimo.</span>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✔️</span>
          <span>Nereikia naudoti chemikalų ar agresyvių metodų.</span>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✔️</span>
          <span>Paliekama lygi teritorija, tinkama tolimesniam naudojimui.</span>
        </li>
        <li className="flex items-start">
          <span className="text-forest-500 mr-2 text-xl">✔️</span>
          <span>Saugus aplinkai ir ekonomiškai naudingas sprendimas.</span>
        </li>
      </ul>
      
      <p className="font-medium">
        Kelmų frezavimas yra puikus pasirinkimas tiek individualiems kiemams, tiek parkams ar
        komercinėms teritorijoms tvarkyti.
      </p>
    </ServiceLayout>
  );
};

export default ServiceStumpGrinding;
