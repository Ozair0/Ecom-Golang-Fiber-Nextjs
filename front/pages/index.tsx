import {Context, useEffect} from "react";
import Image from "next/image";
import axios from "axios";


interface Props {
  status: string;
}

const features = [
  {name: 'Origin', description: 'Designed by Good Goods, Inc.'},
  {name: 'Material', description: 'Solid walnut base with rare earth magnets and powder coated steel card cover'},
  {name: 'Dimensions', description: '6.25" x 3.55" x 1.15"'},
  {name: 'Finish', description: 'Hand sanded and finished with natural oil'},
  {name: 'Includes', description: 'Wood card tray and 3 refill packs'},
  {name: 'Considerations', description: 'Made from natural materials. Grain and color vary with each item.'},
]


const Home = (props: Props) => {
  return (
      <>
        <div className="relative bg-white overflow-hidden">
          <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:static">
              <div className="sm:max-w-lg">
                <h1 className="text-4xl font font-extrabold tracking-tight text-gray-900 sm:text-6xl">
                  Summer styles are finally here
                </h1>
                <p className="mt-4 text-xl text-gray-500">
                  This year, our new summer collection will shelter you from the harsh elements of a world that
                  doesn`&apos;`t care
                  if you live or die. Status: {props.status}
                </p>
              </div>
              <div>
                <div className="mt-10">
                  {/* Decorative image grid */}
                  <div
                      aria-hidden="true"
                      className="pointer-events-none lg:absolute lg:inset-y-0 lg:max-w-7xl lg:mx-auto lg:w-full"
                  >
                    <div
                        className="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                      <div className="flex items-center space-x-6 lg:space-x-8">
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden sm:opacity-0 lg:opacity-100">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-01.jpg"
                                alt=""
                                width={250}
                                height={350}
                                className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-02.jpg"
                                alt=""
                                width={250}
                                height={350}
                                className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-03.jpg"
                                alt=""
                                width={250}
                                height={350}
                                className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-04.jpg"
                                alt=""
                                width={250}
                                height={350}
                                className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-05.jpg"
                                alt=""
                                width={250}
                                height={350}
                                className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-shrink-0 grid grid-cols-1 gap-y-6 lg:gap-y-8">
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-06.jpg"
                                alt=""
                                width={250}
                                height={350}
                                className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="w-44 h-64 rounded-lg overflow-hidden">
                            <Image
                                src="https://tailwindui.com/img/ecommerce-images/home-page-03-hero-image-tile-07.jpg"
                                alt=""
                                width={250}
                                height={350}
                                className="w-full h-full object-center object-cover"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <a
                      href="#"
                      className="inline-block text-center bg-indigo-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-indigo-700"
                  >
                    Shop Collection
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white">
          <div
              className="max-w-2xl mx-auto py-24 px-4 grid items-center grid-cols-1 gap-y-16 gap-x-8 sm:px-6 sm:py-32 lg:max-w-7xl lg:px-8 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Technical
                Specifications</h2>
              <p className="mt-4 text-gray-500">
                The walnut wood card tray is precision milled to perfectly fit a stack of Focus cards. The powder coated
                steel divider separates active cards from new ones, or can be used to archive important task lists.
              </p>

              <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 sm:gap-y-16 lg:gap-x-8">
                {features.map((feature) => (
                    <div key={feature.name} className="border-t border-gray-200 pt-4">
                      <dt className="font-medium text-gray-900">{feature.name}</dt>
                      <dd className="mt-2 text-sm text-gray-500">{feature.description}</dd>
                    </div>
                ))}
              </dl>
            </div>
            <div className="grid grid-cols-2 grid-rows-2 gap-4 sm:gap-6 lg:gap-8">
              <img
                  src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-01.jpg"
                  alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                  className="bg-gray-100 rounded-lg"
              />
              <img
                  src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-02.jpg"
                  alt="Top down view of walnut card tray with embedded magnets and card groove."
                  className="bg-gray-100 rounded-lg"
              />
              <img
                  src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-03.jpg"
                  alt="Side of walnut card tray with card groove and recessed card area."
                  className="bg-gray-100 rounded-lg"
              />
              <img
                  src="https://tailwindui.com/img/ecommerce-images/product-feature-03-detail-04.jpg"
                  alt="Walnut card tray filled with cards and card angled in dedicated groove."
                  className="bg-gray-100 rounded-lg"
              />
            </div>
          </div>
        </div>
      </>
  )
}

export async function getServerSideProps(context: Context<any>) {
  let status: string = "";
  await axios
    .get("/status")
    .then((res) => {
      status = res.data.message;
    })
    .catch((error) => {
      status = "Server Down!";
    });
  return {
    props: { status }, // will be passed to the page component as props
  };
}

export default Home;
