// 1. 放在檔案的最頂端
import svgPaths from './svg-26ra607os2';
// 請確保 'ImageWithFallback' 的 import 也在這裡，如果 Card3 會用到它的話
// import { ImageWithFallback } from '../components/figma/ImageWithFallback';

// =========================================================================
// 原有元件 (Header / Top Part)
// =========================================================================

function Word() {
  return (
    <div
      className="basis-0 box-border content-stretch flex flex-col grow items-end justify-center min-h-px min-w-px  pb-0 pt-[20px] px-0 relative self-stretch shrink-0 z-[2] mr-[-30px]"
      data-name="word"
    >
      <div
        className="flex h-[calc(1px*((var(--transform-inner-width)*0.19129090011119843)+(var(--transform-inner-height)*0.9815333485603333)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.19129090011119843)+(var(--transform-inner-width)*0.9815333485603333)))]"
        style={
          {
            '--transform-inner-width': '94.515625',
            '--transform-inner-height': '33.5',
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[348.972deg]">
          <p className="font-['Homemade_Apple:Regular',_sans-serif] leading-[normal] not-italic relative text-[24px] text-black text-nowrap text-right whitespace-pre">
            Stelwing
          </p>
        </div>
      </div>
      <p className="font-['Fjalla_One:Regular',_sans-serif] leading-[normal] not-italic relative shrink-0 text-[24px] text-black text-nowrap text-right whitespace-pre">
        Duty Free
      </p>
    </div>
  );
}

function WhitePic() {
  return (
    <div
      className="box-border content-stretch flex flex-col items-start mr-[-30px] pb-0 pt-[80px] px-0 relative shrink-0 w-[1100px] z-[1]"
      data-name="whitePic"
    >
      <div className="h-[119px] relative shrink-0 w-full">
        <img
          alt="Login visual"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/mainWhite.jpg"
        />
      </div>
    </div>
  );
}

function Top() {
  return (
    <div
      className="box-border content-stretch flex isolate items-start pl-0 pr-5 py-0 relative shrink-0 w-full"
      data-name="top"
    >
      <Word />
      <WhitePic />
    </div>
  );
}

function Pic() {
  return (
    <div
      className="content-stretch flex items-start relative shrink-0 w-full"
      data-name="pic"
    >
      <div
        className="basis-0 grow h-[450px] min-h-px min-w-px relative shrink-0"
        data-name="left"
      >
        <img
          alt="Left visual"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/mainLeft.jpg"
        />
      </div>
      <div
        className="basis-0 grow h-[450px] min-h-px min-w-px relative shrink-0"
        data-name="right"
      >
        <img
          alt="Right visual"
          className="absolute inset-0 max-w-none object-cover pointer-events-none size-full"
          src="/mainRight.jpg"
        />
      </div>
    </div>
  );
}

// =========================================================================
// 新增的 Main Section 元件 (商品分類與列表)
// =========================================================================

function Words() {
  return (
    <div
      className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0"
      data-name="words"
    >
      <div className="basis-0 flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold grow justify-center leading-[0] min-h-px min-w-px not-italic relative shrink-0 text-[18px] text-black text-center">
        <p className="leading-[normal]">美妝保養</p>
      </div>
    </div>
  );
}

function Chevron() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="chevron">
          <path
            d={svgPaths.p12c69d40}
            id="Icon"
            stroke="var(--stroke-0, black)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </g>
      </svg>
    </div>
  );
}

function Text() {
  return (
    <div
      className="basis-0 content-stretch flex grow h-full items-center justify-center min-h-px min-w-px relative shrink-0"
      data-name="text"
    >
      <Words />
      <Chevron />
    </div>
  );
}

function Option() {
  return (
    <div
      className="basis-0 bg-white grow h-[63px] min-h-px min-w-px relative shrink-0"
      data-name="option"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#dcbb87] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[69px] h-[63px] items-center justify-center pl-0 pr-[20px] py-0 relative w-full">
          <Text />
        </div>
      </div>
    </div>
  );
}

function Words1() {
  return (
    <div
      className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0"
      data-name="words"
    >
      <div className="flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white w-[259px]">
        <p className="leading-[normal]">香氛花園</p>
      </div>
    </div>
  );
}

function Chevron1() {
  return (
    <div className="relative size-[24px]" data-name="chevron">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="chevron">
          <path
            d={svgPaths.p12c69d40}
            id="Icon"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </g>
      </svg>
    </div>
  );
}

function Text1() {
  return (
    <div
      className="basis-0 content-stretch flex grow h-full items-center justify-between min-h-px min-w-px relative shrink-0"
      data-name="text"
    >
      <Words1 />
      <div
        className="flex h-[calc(1px*((var(--transform-inner-width)*0.9999999403953552)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.9999999403953552)+(var(--transform-inner-width)*0)))]"
        style={
          {
            '--transform-inner-width': '24',
            '--transform-inner-height': '24',
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[270deg]">
          <Chevron1 />
        </div>
      </div>
    </div>
  );
}

function Option1() {
  return (
    <div
      className="basis-0 bg-[#dcbb87] grow h-[63px] min-h-px min-w-px relative shrink-0"
      data-name="option"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#dcbb87] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[69px] h-[63px] items-center justify-center pl-0 pr-[20px] py-0 relative w-full">
          <Text1 />
        </div>
      </div>
    </div>
  );
}

function Words2() {
  return (
    <div
      className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0"
      data-name="words"
    >
      <div className="flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white w-[259px]">
        <p className="leading-[normal]">時尚精品</p>
      </div>
    </div>
  );
}

function Chevron2() {
  return (
    <div className="relative size-[24px]" data-name="chevron">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="chevron">
          <path
            d={svgPaths.p12c69d40}
            id="Icon"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </g>
      </svg>
    </div>
  );
}

function Text2() {
  return (
    <div
      className="basis-0 content-stretch flex grow h-full items-center justify-between min-h-px min-w-px relative shrink-0"
      data-name="text"
    >
      <Words2 />
      <div
        className="flex h-[calc(1px*((var(--transform-inner-width)*0.9999999403953552)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.9999999403953552)+(var(--transform-inner-width)*0)))]"
        style={
          {
            '--transform-inner-width': '24',
            '--transform-inner-height': '24',
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[270deg]">
          <Chevron2 />
        </div>
      </div>
    </div>
  );
}

function Option2() {
  return (
    <div
      className="basis-0 bg-[#dcbb87] grow h-[63px] min-h-px min-w-px relative shrink-0"
      data-name="option"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#dcbb87] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[69px] h-[63px] items-center justify-center pl-0 pr-[20px] py-0 relative w-full">
          <Text2 />
        </div>
      </div>
    </div>
  );
}

function Words3() {
  return (
    <div
      className="basis-0 content-stretch flex gap-[10px] grow items-center justify-center min-h-px min-w-px relative shrink-0"
      data-name="words"
    >
      <div className="flex flex-col font-['Inter:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold justify-center leading-[0] not-italic relative shrink-0 text-[18px] text-center text-white w-[259px]">
        <p className="leading-[normal]">品味生活</p>
      </div>
    </div>
  );
}

function Chevron3() {
  return (
    <div className="relative size-[24px]" data-name="chevron">
      <svg
        className="block size-full"
        fill="none"
        preserveAspectRatio="none"
        viewBox="0 0 24 24"
      >
        <g id="chevron">
          <path
            d={svgPaths.p12c69d40}
            id="Icon"
            stroke="var(--stroke-0, white)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
          />
        </g>
      </svg>
    </div>
  );
}

function Text3() {
  return (
    <div
      className="basis-0 content-stretch flex grow h-full items-center justify-between min-h-px min-w-px relative shrink-0"
      data-name="text"
    >
      <Words3 />
      <div
        className="flex h-[calc(1px*((var(--transform-inner-width)*0.9999999403953552)+(var(--transform-inner-height)*0)))] items-center justify-center relative shrink-0 w-[calc(1px*((var(--transform-inner-height)*0.9999999403953552)+(var(--transform-inner-width)*0)))]"
        style={
          {
            '--transform-inner-width': '24',
            '--transform-inner-height': '24',
          } as React.CSSProperties
        }
      >
        <div className="flex-none rotate-[270deg]">
          <Chevron3 />
        </div>
      </div>
    </div>
  );
}

function Option3() {
  return (
    <div
      className="basis-0 bg-[#dcbb87] grow h-[63px] min-h-px min-w-px relative shrink-0"
      data-name="option"
    >
      <div
        aria-hidden="true"
        className="absolute border border-[#dcbb87] border-solid inset-0 pointer-events-none"
      />
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border content-stretch flex gap-[69px] h-[63px] items-center justify-center pl-0 pr-[20px] py-0 relative w-full">
          <Text3 />
        </div>
      </div>
    </div>
  );
}

function Serch() {
  return (
    <div
      className="box-border content-stretch flex gap-[10px] items-center px-[5px] py-0 relative self-stretch shrink-0"
      data-name="serch"
    >
      <div className="relative shrink-0 size-[46.134px]" data-name="Vector">
        <svg
          className="block size-full"
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 47 47"
        >
          <path
            d={svgPaths.p329e4c00}
            fill="var(--fill-0, #DCBB87)"
            id="Vector"
          />
        </svg>
      </div>
    </div>
  );
}

function Component2() {
  return (
    <div
      className="content-stretch flex gap-px items-start relative shrink-0 w-full"
      data-name="Component 2"
    >
      <Option />
      <Option1 />
      <Option2 />
      <Option3 />
      <Serch />
    </div>
  );
}

function OptionGroup() {
  return (
    <div
      className="content-stretch flex flex-col gap-[10px] items-start relative shrink-0 w-full"
      data-name="optionGroup"
    >
      <Component2 />
    </div>
  );
}

function TitleSubtitle() {
  return (
    <div
      className="content-stretch flex flex-col gap-[7px] items-start relative shrink-0 text-[#ba9a60] w-full"
      data-name="Title-subtitle"
    >
      <p
        className="font-['Noto_Sans:Bold',_'Noto_Sans_JP:Bold',_sans-serif] font-bold relative shrink-0 text-[20px] tracking-[-0.46px] w-full"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
      >
        Estee Lauder 雅詩蘭黛
      </p>
      <p
        className="font-['Noto_Sans:Regular',_'Noto_Sans_JP:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] tracking-[-0.368px] w-full"
        style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
      >
        雅詩蘭黛特潤超導全方位修護露100ML
      </p>
    </div>
  );
}

function TextArea() {
  return (
    <div className="relative shrink-0 w-full" data-name="Text-area">
      <div className="size-full">
        <div className="box-border content-stretch flex flex-col gap-[34px] items-start leading-[1.5] pb-[16px] pt-0 px-[16px] relative w-full">
          <TitleSubtitle />
          <p
            className="font-['Noto_Sans:Regular',_sans-serif] font-normal relative shrink-0 text-[16px] text-black tracking-[-0.368px] w-full"
            style={{ fontVariationSettings: "'CTGR' 0, 'wdth' 100" }}
          >
            TWD 8,800
          </p>
        </div>
      </div>
    </div>
  );
}

function Card3() {
  return (
    <div
      className="basis-0 bg-white grow min-h-px min-w-[310.25px] relative rounded-[8px] shrink-0"
      data-name="card3"
    >
      <div className="content-stretch flex flex-col gap-[16px] items-start min-w-inherit overflow-clip relative rounded-[inherit] w-full">
        {/* 如果您有使用 ImageWithFallback，這裡需要還原並確保它被 import */}
        <div className="bg-[#d9d9d9] h-[226px] shrink-0 w-full rounded-t-[8px]">
          {/* 這裡應該放圖片，如果沒有 ImageWithFallback 元件，則用 img 標籤 */}
          {/* <img alt="Product visual" className="size-full object-cover" src="/default-product-image.jpg" /> */}
        </div>
        <TextArea />
      </div>
      <div
        aria-hidden="true"
        className="absolute border border-[#ba9a60] border-solid inset-0 pointer-events-none rounded-[8px]"
      />
    </div>
  );
}

function CardGroup() {
  return (
    <div
      className="box-border content-center flex flex-wrap gap-[10px] items-center px-0 py-[10px] relative shrink-0 w-full"
      data-name="cardGroup"
    >
      {[...Array(8).keys()].map((_, i) => (
        <Card3 key={i} />
      ))}
    </div>
  );
}

function Maincontain() {
  return (
    <div className="relative size-full" data-name="maincontain">
      <div className="flex flex-col items-center justify-center size-full">
        <div className="box-border content-stretch flex flex-col gap-[50px] items-center justify-center px-[64px] py-[50px] relative size-full">
          <OptionGroup />
          <CardGroup />
        </div>
      </div>
    </div>
  );
}

// =========================================================================
// 最終輸出元件 (整合所有部分)
// =========================================================================

export default function Section1() {
  return (
    <div
      className="content-stretch flex flex-col items-end relative size-full"
      data-name="section1"
    >
      <Top />
      <Pic />
      {/* 2. 在這裡加入你想新增的 Maincontain 元件 */}
      <Maincontain />
    </div>
  );
}
