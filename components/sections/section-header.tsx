type headerProp = {
  title: string;
  description?: string;
};

const SectionHeader = ({ title, description }: headerProp) => {
  return (
    <div className="text-center">
      <h2 className="text-balance text-3xl font-semibold lg:text-3xl">
        {title}
      </h2>
      <p className="mt-4">{description}</p>
    </div>
  );
};

export default SectionHeader;
