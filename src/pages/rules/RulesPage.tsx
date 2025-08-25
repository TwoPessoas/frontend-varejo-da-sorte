import FooterComponent from "../home/components/FooterComponent";
import RulesComponent from "./components/RulesComponent";

export default function RulesPage() {
  return (
    <>
      <div className="rules-page">
        <div className="container">
          <RulesComponent />
        </div>
      </div>
      <FooterComponent />
    </>
  );
}
