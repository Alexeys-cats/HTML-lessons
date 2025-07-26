const Footer = () => {
  return (
    <footer className="hidden">
      <div>
        <h6>frontend lessons</h6>
        <p>
          © {new Date().getFullYear()}{' '}
          <span itemProp="name">frontend lessons</span>. Все права защищены.
        </p>
        <div
          itemProp="address"
          itemScope
          itemType="http://schema.org/PostalAddress"
          hidden
        >
          <span itemProp="addressLocality">Москва</span>,
          <span itemProp="streetAddress">Москва</span>
        </div>
        <meta itemProp="telephone" content="" hidden />
        <meta itemProp="email" content="" hidden />
      </div>
    </footer>
  );
};

export default Footer;
