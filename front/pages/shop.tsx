import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "../util/axiosConfig";
import { setCookie, setCookies } from "cookies-next";
export default function Shop() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get("admin/products?page=1&pageSize=20")
      .then((res) => {
        setProducts(res.data.Products);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
          Shop
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.length > 0 &&
            products.map((product: any) => (
              <div key={product.id} className="group relative">
                <div className="min-h-80 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80">
                  <Image
                    src={
                      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                    }
                    width={350}
                    height={450}
                    alt={product.imageAlt}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href={"/product/" + product.ID}>
                        <a>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.title}
                        </a>
                      </Link>
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-gray-900">
                    {product.Currency.code +
                      " " +
                      (product.price + product.additionalPrice)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
      <nav
        aria-label="Page navigation example"
        className="w-full flex justify-center"
      >
        <ul className="inline-flex -space-x-px my-10">
          <li>
            <a
              href="#"
              className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              Previous
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              1
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 text-blue-600 bg-blue-50 border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              2
            </a>
          </li>
          <li>
            <a
              href="#"
              className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
            >
              Next
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
