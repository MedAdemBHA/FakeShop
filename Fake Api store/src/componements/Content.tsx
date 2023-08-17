import image from "../assets/image/ImageHero.png";
const brands = [
  {
    name: "Adidas",
    url: "store/src/assets/image/Brands/adis001_adidas_logo_e1468257076328.jpg",
  },
  {
    name: "Dior",
    url: "../assets/image/Brands/CHRR004_christian_dior_new3874_jpg.jpg",
  },
  {
    name: "Fila",
    url: "../assets/image/Brands/fila001_fila_logo.png",
  },
  {
    name: "Gucci",
    url: "../assets/image/Brands/guci001_logo_gucci.png",
  },
  {
    name: "hermes",
    url: "../assets/image/Brands/hers002_eda8f21950d90e0bbb74542f1df2690e.png",
  },
  {
    name: "H&M",
    url: "../assets/image/Brands/hmaa001_800px_hm_logosvg.png",
  },
  {
    name: "Levis",
    url: "/src/assets/image/Brands/levs002_levis_logo_quersvg.png",
  },
  {
    name: "Louis_vuitton",
    url: "../assets/image/Brands/loun002_louis_vuitton_logo.jpg",
  },
  {
    name: "nike",
    url: "../assets/image/Brands/nike001_1200px_logo_nikesvg.png",
  },
  {
    name: "rolex",
    url: "../assets/image/Brands/rolx002_1200px_rolex_logosvg.png",
  },
];
function Content() {
  return (
    <section className="w-full hero-section px-7 md:pt-20">
      <div className="lg:container mx-auto px-3  ">
        <div className="flex flex-col lg:flex-row lg:justify-around items-center py-20">
          <div className="flex flex-col text-center lg:text-left">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-primary font-bold">
              We Bring Good Things To life,
            </h1>
            <br className="hidden md:block" />
            <p className="text-secondary font-normal  md:text-lg mt-5">
              From work wear to the weekend and everything in between, dial-in
              your wardrobe with stylist-approved apparel that’s selected just
              for you.
            </p>
            <div className="flex flex-col font-medium md:flex-row mt-14 max-w-xs mx-auto lg:mx-0 lg:max-w-lg md:max-w-md  gap-5">
              <button className="btn bg-rose-300 text-white py-3 px-5 md:ml-8 rounded font-semibold md:static">
                Shop
              </button>
              <button className="btn bg-rose-300 text-white py-3 px-5 md:ml-8 rounded font-semibold md:static">
                Order Now
              </button>
            </div>
          </div>
          <div className="-order-1 mb-6 lg:mb-0 lg:order-1 lg:mr-20">
            <img src={image} className="w-full max-w-xs lg:max-w-md" alt="" />
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 mb-6">
        <h3 className="text-2xl font-bold text-gray-800 py-6">Top Brands</h3>

        <div className="grid grid-cols-2 gap-2 md:grid-cols-5 ">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="bg-white p-4 flex justify-center items-center rounded-lg shadow-lg border"
            >
              <img src={brand.url} alt={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Content;
