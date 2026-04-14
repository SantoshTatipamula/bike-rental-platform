import OwnerHero from "@/components/becomeOwner/OwnerHero";
import OwnerBenefits from "@/components/becomeOwner/OwnerBenefits";
import OwnerForm from "@/components/becomeOwner/OwnerForm";
// import OwnerCTA from "@/components/becomeOwner/OwnerCTA";
import CTA from "@/components/home/CTA";



const BecomeOwner = () => {

  
  return (
    <div className="bg-slate-50">
      <OwnerHero />
      <OwnerBenefits />
      <OwnerForm  />
      <CTA
        title="Start earning with your bike 💰"
        description="List your bike and earn passive income easily."
        buttonText="Submit Application"
        link="/become-owner#owner-form"
      />
    </div>
  );
};

export default BecomeOwner;
