
import GetStartedForm from "./GetStartedForm";

const GetStarted = () => {
  return (
    <section id="get-started" className="py-16 bg-gradient-to-b from-[#eee3fb] to-[#c3cffb]">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center text-optiml-purple mb-10">
            Get Started with OptiML
          </h2>
          
          <GetStartedForm />
        </div>
      </div>
    </section>
  );
};

export default GetStarted;
