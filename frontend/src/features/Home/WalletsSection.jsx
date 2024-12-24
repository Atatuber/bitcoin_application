export default function WalletsSection({wallets}) {
    return (
      <section className="text-gray-600 body-font bg-white rounded-lg shadow-md m-2">
        <div className="container mx-auto my-auto">
          <div className="flex flex-col text-center w-full p-10">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                Aanwezige Bitcoin Wallets
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Dit is een demo van een Bitcoin Wallet. Hier kunt u uw Bitcoin
              Wallets beheren. U kunt een nieuwe wallet toevoegen, uw huidige
              wallets bekijken en de balans van uw wallets bekijken.
            </p>
          </div>
        </div>
      </section>
    );
  }
  