'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Map, MapPin, Pencil, Trash2, X } from 'lucide-react';

export interface ComponentsTripItemCardProps {
  open: boolean;
  // title: string;
  // description: string;
  // confirmText: string;
  onConfirm: () => void;
}
// {  }: ComponentsTripItemCardProps

export default function ComponentsTripItemCard() {
  return (
    <>
      <Dialog.Root open={true}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 z-500" />
          <Dialog.Content className="fixed w-[90vx] max-w-[600px] max-h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-ticket-side pl-10 pr-7 py-6 rounded-lg shadow-lg flex flex-col z-550">
            <div className="flex justify-between items-center">
              {/* 左上角類別 */}
              <div className="border-2 border-(--sw-accent) px-3 py-1 rounded-lg">
                吃的
              </div>
              {/* 右上角的操作按鈕 */}
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label="開啟編輯行程視窗"
                  className=" text-gray-600 hover:text-black"
                  // onClick={() => setIsOpenCloseComfirm(true)}
                >
                  <Pencil />
                </button>
                <button
                  type="button"
                  aria-label="開啟編輯行程視窗"
                  className=" text-gray-600 hover:text-black"
                  // onClick={() => setIsOpenCloseComfirm(true)}
                >
                  <Trash2 />
                </button>
                <button
                  type="button"
                  aria-label="關閉行程彈出視窗"
                  className=" text-gray-600 hover:text-black"
                  // onClick={() => setIsOpenCloseComfirm(true)}
                >
                  <X />
                </button>
              </div>
            </div>

            <Dialog.Title className="text-xl font-bold my-4">
              新宿早餐
            </Dialog.Title>
            <Dialog.Description asChild className="flex-1">
              <div>
                {/* 時間 */}
                <div className="border-b border-black pb-2">
                  12月 25日 星期四 ‧ 上午 09：00 - 上午 10：30
                </div>
                {/* 備註 */}
                <div className="py-2 border-b border-black">
                  - NEWoMan新宿2樓
                  <br /> - 來自美國加州聖塔克魯斯，西海岸陽光與活力的咖啡烘焙店
                  <br /> - 必吃：精品咖啡、比利時鬆餅
                </div>
                {/* 地址 */}
                <div className="py-2 flex flex-col gap-2 border-b border-black">
                  <div className="flex gap-4">
                    <MapPin />
                    <div>
                      日本〒151-0051 Tokyo, Shibuya, Sendagaya, 5 Chome−24−55
                      NEWoMan 新宿 ２Ｆ
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Map />
                    <a href="https://maps.app.goo.gl/Js7vanXrwEuji4sH8">
                      https://maps.app.goo.gl/Js7vanXrwEuji4sH8
                    </a>
                  </div>
                </div>
                {/* 卡片資料 */}
                <div className="pt-3 flex flex-col gap-2">
                  {/* 單張卡片 */}
                  <div className="flex h-25 gap-2 p-3 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
                    {/* 左邊圖片 */}
                    <div className="aspect-square bg-gray-200 overflow-hidden shrink-0">
                      <img
                        src="https://upssmile.com/wp-content/uploads/2023/11/20231111-IMG_2970-2.jpg"
                        alt="og"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {/* 右邊文字 */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="truncate">
                        繼Blue Bottle
                        Coffee藍瓶咖啡後，加州人氣咖啡廳來東京新宿展店，新宿神等級好喝拿鐵與單品咖啡，曾被GQ評為「世界咖啡館BEST
                        10」，咖啡豆是從加州本店產地直送高品質新鮮咖啡豆，可享這咖啡多好喝，新宿咖啡廳收口袋。
                      </div>
                      <p className="flex-1 overflow-hidden sw-p2">
                        東京咖啡廳推薦，新宿咖啡廳必喝，VERVE COFFEE
                        ROASTERS新宿位於JR新宿車站新南口旁，新宿NEWoMan百貨2樓南口位置，來自美國加州人氣咖啡廳VERVE
                        CAFE日本開分店，曾被GQ評為「世界咖啡館BEST
                        10」，列為日本Blue Bottle
                        Coffee勁敵，從早上7點營業到晚上10點，東京自
                      </p>
                    </div>
                  </div>
                  {/* 單張卡片 */}
                  <div className="flex h-25 gap-2 p-3 shadow-[0_0_10px_rgba(0,0,0,0.15)] rounded-lg">
                    {/* 左邊圖片 */}
                    <div className="aspect-square bg-gray-200 overflow-hidden shrink-0">
                      <img
                        src="https://resize-image.vocus.cc/resize?norotation=true&quality=80&url=https%3A%2F%2Fimages.vocus.cc%2Fef0070fe-468d-4f00-9a23-806d635c3a14.jpg&width=1200&sign=Ua3x-tNJsLLRRdzR_1DkopGmcV6dbdJi8Op2_4t-1lw"
                        alt="og"
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                    {/* 右邊文字 */}
                    <div className="flex-1 min-w-0 flex flex-col gap-2">
                      <div className="truncate">
                        東京鎌倉的加州風味VERVE COFFEE ROASTERS｜寵物友善咖啡廳
                      </div>
                      <p className="flex-1 overflow-hidden sw-p2">
                        美國加州衝浪天堂Santa Cruz發跡的《VERVE COFFEE
                        ROASTERS》進駐東京、鎌倉，充滿加州風格的咖啡廳。這家咖啡廳最大特色就是允許毛小孩進入，非常難得。推薦給大家的VERVE
                        COFFEE的咖啡菜單。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Dialog.Description>

            {/* <div className="mt-6 flex justify-end">
              <button className="sw-btn sw-btn--gold-square">確定</button>
            </div> */}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
