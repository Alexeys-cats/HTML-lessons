import htmlData from '../shared/dataJson/data-html.json';
import HtmlCard from '../components/HtmlCard';

const HtmlPage = () => {
  return (
    <div className="p-8 flex flex-wrap gap-6 justify-center">
      {htmlData.map((item) => (
        <HtmlCard
          key={item.id}
          name={item.name}
          description={item.description}
          start={item.start}
          end={item.end ?? undefined}
          example={item.example}
        />
      ))}
    </div>
  );
};

export default HtmlPage;
