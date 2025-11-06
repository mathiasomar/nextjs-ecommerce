type Category = {
  id: number;
  name: string;
  slag: string;
};

const categoryMenu = [
  {
    id: 1,
    name: "T Shirts",
    slag: "t-shirt",
  },
  {
    id: 2,
    name: "Shirts",
    slag: "shirt",
  },
  {
    id: 3,
    name: "Jeans",
    slag: "jeans",
  },
  {
    id: 4,
    name: "Dress",
    slag: "dress",
  },
  {
    id: 5,
    name: "Dera",
    slag: "dera",
  },
];

const CategoryMenu = () => {
  return (
    <div className="flex items-center gap-4 justify-center my-6">
      <button className="rounded-full text-sm bg-primary text-primary-foreground border border-secondary rind-2 px-2 py-1 transition-color duration-500 ease-in-out cursor-pointer hover:bg-primary hover:text-primary-foreground">
        All
      </button>

      {categoryMenu.map((category: Category) => (
        <button
          key={category.id}
          className="rounded-full text-sm border border-secondary rind-2 px-2 py-1 transition-color duration-500 ease-in-out cursor-pointer hover:bg-primary hover:text-primary-foreground"
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
