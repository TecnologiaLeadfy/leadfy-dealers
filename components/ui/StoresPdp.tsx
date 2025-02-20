import type { LoaderReturnType } from "$live/types.ts";

import type { PdpReturn } from "deco-sites/leadfy-dealers/components/types.ts";

import type { Image as LiveImage } from "deco-sites/std/components/types.ts";

import Form from "deco-sites/leadfy-dealers/islands/Form.tsx";
import WhatsAppFloatButton from "deco-sites/leadfy-dealers/islands/WhatsAppFloatButton.tsx";
import Image from "deco-sites/std/components/Image.tsx";

import { Head } from "$fresh/runtime.ts";

import Icon from "deco-sites/leadfy-dealers/components/ui/Icon.tsx";
import Slider from "deco-sites/leadfy-dealers/components/ui/Slider.tsx";
import SliderJS from "deco-sites/leadfy-dealers/islands/SliderJS.tsx";
import { useId } from "deco-sites/leadfy-dealers/sdk/useId.ts";

export interface WhatsNormalButton {
  textWhatsButton: string;
  whatsImage?: LiveImage;
}

export interface Props {
  whatsNormalButton: WhatsNormalButton;
  /** @description Show WhatsApp Float Button */
  whatsFloatButton?: boolean;
  page: LoaderReturnType<PdpReturn | null>;
}

export default function StoresPdp(
  { page, whatsFloatButton = false, whatsNormalButton }: Props,
) {
  if (page) {
    const vehicle = page.result[0];
    const { storeDataFromApi, idLoja } = page;

    const images = vehicle["g:additional_image_link"][0] != ""
      ? [...vehicle["g:image_link"], ...vehicle["g:additional_image_link"]]
      : [...vehicle["g:image_link"]];

    return (
      <>
        <Head>
          <title>{vehicle["g:title"][0]}</title>
          <link rel="icon" type="image/png" href={storeDataFromApi.logo}></link>
        </Head>
        <div>
          <div class="max-w-[1280px] py-[96px] sm:py-[112px] mx-auto flex flex-col sm:flex-row">
            <div
              class={`w-full sm:w-1/2 px-5 pt-5 sm:px-0 flex gap-3 sm:flex-wrap sm:pt-10 overflow-auto scrollbar-none ${
                vehicle["g:image_link"].length == 1 && "items-center"
              }`}
            >
              <GalleryProductPage images={images} />
            </div>
            <div class="w-full px-5 sm:px-0 sm:w-1/2 sm:max-w-[450px] mx-auto pt-6 top-0 self-start">
              <Form
                vehicle={vehicle}
                idLoja={idLoja}
                phone={storeDataFromApi.whatsapp}
                whatsNormalButton={whatsNormalButton}
              />
            </div>
          </div>
        </div>
        {whatsFloatButton && <WhatsAppFloatButton />}
      </>
    );
  }

  return <h1>Product Not Found</h1>;
}

function GalleryProductPage({ images }: { images: string[] }) {
  const id = useId();

  return (
    <div
      id={id}
      class="grid grid-cols-[48px_1fr_48px] sm:grid-cols-[120px_1fr_120px] grid-rows-[1fr_48px_1fr_64px]"
    >
      <Slider class="carousel carousel-center w-full col-span-full row-span-full gap-2">
        {images?.map((image, index) => (
          <Slider.Item
            index={index}
            class="carousel-item w-full flex items-center"
          >
            <Image
              class="w-full h-max"
              src={image}
              width={550}
            />
          </Slider.Item>
        ))}
      </Slider>

      {images?.length! > 1 ? <Buttons /> : null}

      <Dots images={images} />

      <SliderJS rootId={id} infinite />
    </div>
  );
}

function Dots({ images }: { images: string[] }) {
  return (
    <>
      <ul class="carousel justify-center col-span-full gap-2 z-10 pt-5">
        {images?.map((image, index) => (
          <li class="carousel-item">
            <Slider.Dot index={index}>
              <div class="w-14 h-12 py-5 border-[1px] border-black flex justify-center items-center opacity-40 group-disabled:opacity-100">
                <Image
                  class="w-[40px] h-max"
                  src={image}
                  width={80}
                />
              </div>
            </Slider.Dot>
          </li>
        ))}
      </ul>
    </>
  );
}

function Buttons() {
  return (
    <>
      <div class="flex items-center justify-center z-10 col-start-1 row-start-2">
        <Slider.PrevButton>
          <Icon
            class="text-black"
            size={24}
            id="ChevronLeft"
            strokeWidth={3}
          />
        </Slider.PrevButton>
      </div>
      <div class="flex items-center justify-center z-10 col-start-3 row-start-2">
        <Slider.NextButton>
          <Icon
            class="text-black"
            size={24}
            id="ChevronRight"
            strokeWidth={3}
          />
        </Slider.NextButton>
      </div>
    </>
  );
}
