import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { FormEvent, useEffect, useState } from "react";
import axios from "../util/axios";
import { useRouter } from "next/router";
import { showCart } from "../store/toggleCart";
import { ProductState } from "../store/products";
import {
  addItemToCart,
  deleteItemFromCart,
  removeItemFromCart,
} from "../store/cart";
import { MinusIcon, PlusIcon } from "@heroicons/react/solid";

export default function Cart() {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);
  const show = useSelector((state: RootState) => state.toggleCart.Toggle);
  const total = useSelector((state: RootState) => state.cart.total);
  const dispatch = useDispatch();
  const [products, setProducts]: [any, any] = useState([]);
  useEffect(() => {
    if (!router.isReady) return;
    setProducts([]);
    items.map((item) => {
      axios
        .get(`products/${item?.ID}`)
        .then((res) => {
          let userData: ProductState = res.data;
          // @ts-ignore
          userData.QTY = item.QTY;
          setProducts((product: any) => [...product, userData]);
        })
        .catch((error) => error);
    });
  }, [items, router.isReady]);
  const addToCart = (event: FormEvent, id: number, price: number) => {
    event.preventDefault();
    dispatch(addItemToCart({ ID: id, QTY: 1, price }));
  };

  const removeFromCart = (event: FormEvent, id: number) => {
    event.preventDefault();
    dispatch(removeItemFromCart(id));
  };

  const deleteItem = (event: FormEvent, id: number) => {
    event.preventDefault();
    dispatch(deleteItemFromCart(id));
  };

  return (
    <>
      {show && (
        <div
          className="z-40 w-full h-full bg-black bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden fixed sticky-0"
          id="chec-div"
        >
          <div
            className="w-full absolute z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700"
            id="checkout"
          >
            <div className="flex md:flex-row flex-col justify-end" id="cart">
              <div
                className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white overflow-y-auto overflow-x-hidden h-screen"
                id="scroll"
              >
                <div
                  className="flex items-center text-gray-500 hover:text-gray-600 cursor-pointer"
                  onClick={() => dispatch(showCart(false))}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-left"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <polyline points="15 6 9 12 15 18" />
                  </svg>
                  <p className="text-sm pl-2 leading-none">Back</p>
                </div>
                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">
                  Cart
                </p>
                {products.length > 0 &&
                  products.map((product: ProductState, index: number) => (
                    <div
                      key={product.ID}
                      className={`md:flex items-center py-8 border-t border-gray-200${
                        index === 0 ? " mt-14" : ""
                      }`}
                    >
                      <div className="w-1/4">
                        <img
                          src="https://cdn.tuk.dev/assets/templates/e-commerce-kit/bestSeller3.png"
                          alt={"Image"}
                          className="w-full h-full object-center object-cover"
                        />
                      </div>
                      <div className="md:pl-3 md:w-3/4">
                        <div className="flex items-center justify-between w-full pt-1">
                          <p className="text-base font-black leading-none text-gray-800">
                            {product.title}
                          </p>
                          {/*<select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">*/}
                          {/*  <option>01</option>*/}
                          {/*  <option>02</option>*/}
                          {/*  <option>03</option>*/}
                          {/*</select>*/}
                          <div className="py-2 px-1 border-gray-200 mr-6 focus:outline-none flex items-center justify-between">
                            <a
                              href=""
                              onClick={(event) =>
                                removeFromCart(event, product.ID)
                              }
                            >
                              <MinusIcon
                                className="h-6 w-6 text-black mr-4"
                                aria-hidden="true"
                              />
                            </a>
                            <input
                              className="w-16 text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                              type="number"
                              readOnly
                              value={`${product.QTY}`}
                            />
                            <a
                              href=""
                              onClick={(event) =>
                                addToCart(
                                  event,
                                  product.ID,
                                  product.price + product.additionalPrice
                                )
                              }
                            >
                              <PlusIcon
                                className="h-6 w-6 text-black ml-4"
                                aria-hidden="true"
                              />
                            </a>
                          </div>
                        </div>
                        <p className="text-xs leading-3 text-gray-600 pt-2">
                          Height: {product.height}
                        </p>
                        <p className="text-xs leading-3 text-gray-600 py-4">
                          Width: {product.width}
                        </p>
                        <p className="w-96 text-xs leading-3 text-gray-600">
                          Weight: {product.weight}
                        </p>
                        <div className="flex items-center justify-between pt-5 pr-6">
                          <div className="flex itemms-center">
                            {/*<a href="" className="text-xs leading-3 underline text-gray-800">*/}
                            {/*  Add to favorites*/}
                            {/*</a>*/}
                            <a
                              href=""
                              onClick={(event) => deleteItem(event, product.ID)}
                              className="text-xs leading-3 underline text-red-500"
                            >
                              Remove
                            </a>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="text-base font-black leading-none text-gray-800">
                              Price: {product.Currency.code + " "}
                              {product.price + product.additionalPrice}
                            </p>
                            <p className="text-base font-black leading-none text-gray-800 mt-5">
                              Total: {product.Currency.code + " "}
                              {(product.price + product.additionalPrice) *
                                product.QTY}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="xl:w-1/2 md:w-1/3 xl:w-1/4 w-full bg-gray-100 h-full">
                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                  <div>
                    <p className="text-4xl font-black leading-9 text-gray-800">
                      Summary
                    </p>
                    <div className="flex items-center justify-between pt-16">
                      <p className="text-base leading-none text-gray-800">
                        Subtotal
                      </p>
                      <p className="text-base leading-none text-gray-800">
                        ${total}
                      </p>
                    </div>
                    {/*<div className="flex items-center justify-between pt-5">*/}
                    {/*  <p className="text-base leading-none text-gray-800">*/}
                    {/*    Shipping*/}
                    {/*  </p>*/}
                    {/*  <p className="text-base leading-none text-gray-800">*/}
                    {/*    $30*/}
                    {/*  </p>*/}
                    {/*</div>*/}
                    {/*<div className="flex items-center justify-between pt-5">*/}
                    {/*  <p className="text-base leading-none text-gray-800">*/}
                    {/*    Tax*/}
                    {/*  </p>*/}
                    {/*  <p className="text-base leading-none text-gray-800">*/}
                    {/*    $35*/}
                    {/*  </p>*/}
                    {/*</div>*/}
                  </div>
                  <div>
                    <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                      <p className="text-2xl leading-normal text-gray-800">
                        Total
                      </p>
                      <p className="text-2xl font-bold leading-normal text-right text-gray-800">
                        ${total}
                      </p>
                    </div>
                    <button
                      onClick={() => dispatch(showCart(false))}
                      className="text-base leading-none w-full py-5 bg-gray-800 border-gray-800 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 text-white"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
