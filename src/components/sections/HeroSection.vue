<template>
  <!-- <div class="container px-6 py-16 mx-auto mt-6">
    <div class="items-center lg:flex">
      <div class="w-full lg:w-1/2">
        <div class="lg:max-w-lg">
          <h1 class="text-3xl font-semibold text-gray-800 lg:text-4xl">
            Chào mừng bạn<br />
            đến với <span class="text-blue-500">AutoVision</span>
          </h1>

          <p class="mt-3 text-gray-600 dark:text-gray-400">
            Chúng tôi tự hào giới thiệu một nền tảng trực tuyến hoàn hảo, nơi
            bạn có thể khám phá và mua sắm những chiếc xe ô tô xuất sắc. Với một
            tầm nhìn đầy tâm huyết và cam kết đem đến cho bạn những trải nghiệm
            mua sắm độc đáo, chúng tôi đã tạo ra một không gian trực tuyến đầy
            sự đa dạng và chất lượng về thế giới ô tô.
          </p>

          <button
            class="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-500 hover:bg-blue-600 rounded-lg lg:w-auto focus:outline-none focus:bg-blue-500"
          >
            Khám phá ngay
          </button>
        </div>
      </div>

      <div
        class="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2"
      >
        <img
          class="w-full h-full lg:max-w-lg max-w-sm"
          :src="carImgHero"
          alt="Catalogue-pana.svg"
        />
      </div>
    </div>
  </div> -->

  <div class="relative overflow-hidden bg-white mt-4 sm:mt-24 px-4 sm:px-0">
    <div class="pb-80 pt-16 sm:pb-40 sm:pt-24 lg:pb-48 lg:pt-40">
      <div class="relative mx-auto max-w-full sm:static sm:px-6">
        <div class="sm:max-w-lg">
          <h1
            class="text-4xl font-medium tracking-tight text-gray-900 sm:text-4xl"
          >
            Chào mừng bạn<br />
            đến với <span class="text-blue-500">AutoVision</span>
          </h1>
          <p class="mt-4 text-xl text-gray-500">
            Với một tầm nhìn đầy tâm huyết và cam kết đem đến cho bạn những trải
            nghiệm mua sắm độc đáo, chúng tôi đã tạo ra một không gian trực
            tuyến đầy sự đa dạng và chất lượng về thế giới ô tô.
          </p>
        </div>
        <div>
          <div class="mt-10">
            <div
              aria-hidden="true"
              class="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-full"
            >
              <div
                class="absolute transform sm:left-1/2 sm:top-0 sm:translate-x-8 lg:left-1/2 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-8"
              >
                <div class="flex items-center space-x-6 lg:space-x-8">
                  <div
                    class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div
                      class="h-64 w-48 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100"
                    >
                      <img
                        src="https://images.unsplash.com/photo-1581439645268-ea7bbe6bd091?auto=format&fit=crop&q=80&w=1854&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-48 overflow-hidden rounded-lg">
                      <img
                        src="https://images.unsplash.com/photo-1617646131875-0986960a4fb7?auto=format&fit=crop&q=80&w=1854&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div
                    class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div class="h-64 w-48 overflow-hidden rounded-lg">
                      <img
                        src="https://images.unsplash.com/photo-1632993950427-44e4c8f90023?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-48 overflow-hidden rounded-lg">
                      <img
                        src="https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-48 overflow-hidden rounded-lg">
                      <img
                        src="https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&q=80&w=1964&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                  <div
                    class="grid flex-shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8"
                  >
                    <div class="h-64 w-48 overflow-hidden rounded-lg">
                      <img
                        src="https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div class="h-64 w-48 overflow-hidden rounded-lg">
                      <img
                        src="https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&q=80&w=1887&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                        class="h-full w-full object-cover object-center"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="#"
              class="inline-block rounded-xl border border-transparent bg-blue-500 px-6 py-2 text-center font-medium text-white hover:bg-blue-700"
              >Khám phá ngay</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
