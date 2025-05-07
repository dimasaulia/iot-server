import { Hono } from 'hono';
import Layout from '../providers/layout/index.layout';
import SidebarLayout from '../providers/layout/sidebar.layout';
import IconCard from '../providers/component/icon.card.comp';
import DataCard from '../providers/component/data.card';
import { prisma } from '../providers/database.providers';
import { SensorWithLatestValue } from '../device/device.model';

export const dashboardWeb = new Hono();

dashboardWeb.get('/', async (c) => {
  const result = await prisma.$queryRawUnsafe<SensorWithLatestValue[]>(`
      SELECT 
        s.sensor_code, 
        s.description AS sensor_description, 
        s."type" AS sensor_type,
        (
          SELECT sr.value 
          FROM "SensorRecord" sr 
          WHERE sr.sensor_id = s.sensor_id 
          ORDER BY sr.sensor_record_id DESC 
          FETCH FIRST 1 ROWS ONLY
        ) AS sensor_value,
        case  
          when S."type" = 'temprature' then '°C'
          when S."type" = 'humidity' then '%'
          when S."type" = 'hic' then ''
          when S."type" = 'pm2' then ''
        end sensor_index
      FROM "Sensor" s;
  `);
  return c.html(
    <Layout js={['/public/js/dashboard.js']}>
      <SidebarLayout>
        <h2 class="font-pjs text-white text-xl font-bold mb-5">
          Hallo! Selamat Datang
          <span class="text-gray-300 font-light text-sm"> 29&deg;C 90%</span>
        </h2>

        <div class="grid grid-cols-10 grid-rows-10 content-center">
          <div class="col-span-10 order-2 lg:col-span-2 lg:order-1">
            <div class="bg-glass rounded-3xl p-3 w-full lg:w-64 h-16 lg:h-[600px] overflow-y-scroll">
              {/* CARD */}
              <IconCard
                iconPath="/public/img/icon/Bed.png"
                text="Kamar Tidur"
              />
            </div>
          </div>
          <div class="col-span-10 lg:col-span-8 order-1 lg:order-2 h-[29rem] md:h-auto overflow-y-scroll">
            <div class="h-auto md:h-full flex flex-col items-center lg:flex-row overflow-y-scroll">
              {/* TANGGAL */}
              <div class="w-[250px] h-32 lg:h-full flex flex-col items-center justify-center me-0 lg:me-16">
                <h1 class="font-semibold font-pjs text-7xl lg:text-9xl text-white">
                  <span id="hour">-</span>
                  <span class="hidden lg:block"></span>
                  <span class="inline lg:hidden">:</span>
                  <span id="min">-</span>
                </h1>
                <h4 class="text-white text-sm font-light" id="date">
                  ...
                </h4>
              </div>
              {/* SENSOR */}
              <div class="w-full h-auto overflow-x-hidden md:overflow-x-scroll grid grid-cols-8 grid-rows-4 ">
                {/* DATA FROM WHEATER API */}
                <div class="col-start-1 col-end-9 md:col-start-1 md:col-end-3 row-start-1 row-end-1 md:row-start-1 md:row-end-4 py-3 px-4 bg-purple-500-500 z-10">
                  <div class="relative w-full h-full rounded-md overflow-hidden z-10">
                    <img
                      class="w-full h-full object-cover absolute inset-0 z-10"
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
                <div
                  id="sensor-container"
                  class="col-start-1 col-end-9 md:col-start-3 md:col-end-7 row-start-2 md:row-start-1 row-end-2 md:row-end-4 py-3 px-4 flex flex-wrap justify-between content-between"
                >
                  {result.map((value, i) => (
                    <DataCard
                      key={`${value.sensor_code}-${value.sensor_type}`} // always include a unique key
                      id={`${value.sensor_code}-${value.sensor_type}`}
                      sensorValue={String(value.sensor_value)}
                      sensorScale={value.sensor_index}
                      sensorType={value.sensor_type}
                      sensorDescription={value.sensor_description}
                      iconPath={`/public/img/icon/rand-${i + 1}.png`}
                    />
                  ))}
                </div>
                <div class="col-start-1 col-end-9 lg:col-start-1 lg:col-end-5 row-start-3 row-end-3 lg:row-start-4 lg:row-end-5 py-3 px-4">
                  <h4 class="text-white font-medium">Bulb Controll</h4>
                  <div class="slider-wrapper">
                    <input type="range" name="led" id="led" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarLayout>
    </Layout>
  );
});
