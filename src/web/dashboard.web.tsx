import { Hono } from 'hono';
import Layout from '../providers/layout/index.layout';
import SidebarLayout from '../providers/layout/sidebar.layout';
import IconCard from '../providers/component/icon.card.comp';
import DataCard from '../providers/component/data.card';

export const dashboardWeb = new Hono();

dashboardWeb.get('/', async (c) => {
  return c.html(
    <Layout>
      <SidebarLayout>
        <h2 class="font-pjs text-white text-xl font-bold mb-5">
          Hallo! Selamat Datang
          <span class="text-gray-300 font-light text-sm"> 29&deg;C 90%</span>
        </h2>

        <div class="grid grid-cols-10 content-center">
          <div class="col-span-2">
            <div class="bg-glass rounded-3xl p-3 w-64 h-[600px] overflow-y-scroll">
              {/* CARD */}
              <IconCard
                iconPath="/public/img/icon/Bed.png"
                text="Kamar Tidur"
              />
              <IconCard
                iconPath="/public/img/icon/Bath.png"
                text="Kamar Mandi"
              />
              <IconCard iconPath="/public/img/icon/Garden.png" text="Kebun" />
              <IconCard iconPath="/public/img/icon/Home.png" text="Rumah" />
              <IconCard
                iconPath="/public/img/icon/Living.png"
                text="Ruang Keluarga"
              />
              <IconCard
                iconPath="/public/img/icon/Bed.png"
                text="Kamar Tidur"
              />
              <IconCard
                iconPath="/public/img/icon/Bath.png"
                text="Kamar Mandi"
              />
              <IconCard iconPath="/public/img/icon/Garden.png" text="Kebun" />
              <IconCard iconPath="/public/img/icon/Home.png" text="Rumah" />
              <IconCard
                iconPath="/public/img/icon/Living.png"
                text="Ruang Keluarga"
              />
              <IconCard
                iconPath="/public/img/icon/Bed.png"
                text="Kamar Tidur"
              />
              <IconCard
                iconPath="/public/img/icon/Bath.png"
                text="Kamar Mandi"
              />
              <IconCard iconPath="/public/img/icon/Garden.png" text="Kebun" />
              <IconCard iconPath="/public/img/icon/Home.png" text="Rumah" />
              <IconCard
                iconPath="/public/img/icon/Living.png"
                text="Ruang Keluarga"
              />
            </div>
          </div>
          <div class="col-span-8 flex">
            {/* TANGGAL */}
            <div class="w-[250px] h-full flex flex-col items-center justify-center me-16">
              <h1 class="font-semibold font-pjs text-9xl text-white">
                <span id="#hour">10</span> <br />
                <span id="#min">16</span>
              </h1>
              <h4 class="text-white text-sm font-light">Minggu, 2 Mei 2025</h4>
            </div>
            {/* SENSOR */}
            <div class="w-full h-full overflow-x-scroll grid grid-cols-8 grid-rows-4">
              {/* DATA FROM WHEATER API */}
              <div class="col-start-1 col-end-3 row-start-1 row-end-4 py-3 px-4">
                <div class="relative w-full h-full rounded-md overflow-hidden">
                  <img
                    class="w-full h-full object-cover absolute inset-0"
                    src="https://images.unsplash.com/photo-1591925323320-f2246a3cfd36?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt=""
                  />
                  <div class="absolute inset-0 flex flex-col items-center justify-center z-10 bg-glass-over-image">
                    <h1 class="text-white text-2xl font-bold text-center mb-52">
                      Depok, Jawa Barat
                    </h1>
                    <svg
                      class="w-16 h-q6 text-white mb-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 31.852 32"
                      enable-background="new 0 0 31.852 32"
                      xml:space="preserve"
                    >
                      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        {' '}
                        <g id="rain">
                          {' '}
                          <g>
                            {' '}
                            <path d="M28.737,9.38c0.154-0.602,0.246-1.229,0.246-1.88c0-4.143-3.356-7.5-7.5-7.5c-3.375,0-6.227,2.229-7.169,5.295 C13.428,4.498,12.268,4,10.983,4C8.456,4,6.387,5.883,6.051,8.32C2.649,8.692,0,11.636,0,15.138c0,3.755,3.043,6.861,6.797,6.861 c3.756,0,14.5,0,18.254,0c3.758,0,6.801-3.106,6.801-6.861C31.853,12.744,30.608,10.6,28.737,9.38z"></path>{' '}
                            <path d="M13.927,30c0,1.104,0.896,2,2,2c1.104,0,2-0.896,2-2c0-2-2-4-2-4S13.927,28,13.927,30z"></path>{' '}
                            <path d="M20.964,27c0,1.104,0.896,2,2,2c1.104,0,2-0.896,2-2c0-2-2-4-2-4S20.964,25,20.964,27z"></path>{' '}
                            <path d="M6.964,27c0,1.104,0.896,2,2,2c1.104,0,2-0.896,2-2c0-2-2-4-2-4S6.964,25,6.964,27z"></path>{' '}
                          </g>{' '}
                        </g>{' '}
                        <g id="Layer_1_1_"> </g>{' '}
                      </g>
                    </svg>
                    <h1 class="text-white text-lg font-normal">
                      28&deg;C Real Feel
                    </h1>
                  </div>
                </div>
              </div>

              {/* DATA FROM SENSOR */}
              <div class="col-start-3 col-end-5 row-start-1 row-end-4 py-3 px-4 flex flex-col justify-between">
                <DataCard
                  sensorValue="28&deg;C"
                  sensorType="Temprature"
                  sensorDescription="Measure Temprature in Description"
                  iconPath="/public/img/icon/rand-2.png"
                />
                <DataCard
                  sensorValue="90%"
                  sensorType="Humidity"
                  sensorDescription="Measure Humidity in Percentage"
                  iconPath="/public/img/icon/rand-3.png"
                />
                <DataCard
                  sensorValue="0"
                  sensorType="Dust"
                  sensorDescription="Measure Dust"
                  iconPath="/public/img/icon/rand-1.png"
                />
              </div>
              <div class="col-start-1 col-end-5 row-start-4 row-end-5 py-3 px-4 ">
                <h4 class="text-white font-medium">Bulb Controll</h4>
                <div class="slider-wrapper">
                  <input type="range" name="led" id="led" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </Layout>
  );
});
