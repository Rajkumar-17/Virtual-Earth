import { useAuth } from "../store/auth";

export const Service = () => {
  const { service } = useAuth();

  return (
    <section className="section-services">
      <div className="container">
        <h1 className="main-heading"> Services </h1>
      </div>

      <div className="container grid grid-three-cols">
        {Array.isArray(service) && service.length > 0 ? (
          service.map((curElem, index) => {
            const { price, description, provider, service } = curElem;

            return (
              <div className="card" key={index}>
                <div className="card-img">
                  <img src="/images/home.svg" alt="services" width="500" height="500" />
                </div>
                <div className="card-details">
                  <div className="grid grid-two-cols">
                    <p>{provider}</p>
                    <p>${price}/-</p>
                  </div>
                  <h2>{service}</h2>
                  <p>{description}</p>
                </div>
              </div>
            );
          })
        ) : (
          <p>No services available</p>
        )}
      </div>
    </section>
  );
};
