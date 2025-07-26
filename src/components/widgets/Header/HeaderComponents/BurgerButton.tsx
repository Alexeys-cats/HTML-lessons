interface Props {
  isOpen: boolean;
  onClick: () => void;
}

const BurgerButton = ({ isOpen, onClick }: Props) => {
  return (
    <button
      className="sm:hidden flex flex-col justify-center items-center
		w-8 ml-2"
      onClick={onClick}
      aria-label="Jnrhsnm vty."
    >
      <span
        className={`block w-6 h-0.5 bg-[#2D2D2D] mb-1 transition-all duration-200 ${
          isOpen ? 'rotate-45 translate-y-1.5' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-[#2D2D2D] mb-1 transition-all duration-200 ${
          isOpen ? 'opacity-0' : ''
        }`}
      />
      <span
        className={`block w-6 h-0.5 bg-[#2D2D2D] transition-all duration-200 ${
          isOpen ? '-rotate-45 -translate-y-1.5' : ''
        }`}
      />
    </button>
  );
};

export default BurgerButton;
