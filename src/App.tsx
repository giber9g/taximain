// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState, useEffect } from "react";
import * as echarts from "echarts";
const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState("main");
  // Новости компании
  const news = [
    {
      id: 1,
      title: "Запуск нового тарифа Бизнес+",
      date: "15.05.2025",
      image:
        "https://readdy.ai/api/search-image?query=luxury%20business%20class%20car%20interior%20with%20leather%20seats%20and%20modern%20dashboard%2C%20professional%20automotive%20photography%2C%20high%20quality&width=400&height=250&seq=16&orientation=landscape",
      text: "Мы рады представить новый премиальный тариф для самых требовательных клиентов. Бизнес+ включает автомобили премиум-класса и персонального водителя.",
    },
    {
      id: 2,
      title: "Расширение зоны обслуживания",
      date: "10.05.2025",
      image:
        "https://readdy.ai/api/search-image?query=city%20map%20with%20highlighted%20service%20zones%2C%20modern%20urban%20planning%20visualization%2C%20professional%20design%2C%20high%20quality&width=400&height=250&seq=17&orientation=landscape",
      text: "Теперь наш сервис доступен в пригородных районах. Мы значительно расширили зону обслуживания, чтобы быть ближе к клиентам.",
    },
    {
      id: 3,
      title: "Обновление мобильного приложения",
      date: "05.05.2025",
      image:
        "https://readdy.ai/api/search-image?query=modern%20mobile%20app%20interface%20design%20for%20taxi%20service%2C%20clean%20UI%20design%20with%20yellow%20accents%2C%20professional%20mockup&width=400&height=250&seq=18&orientation=landscape",
      text: "Вышло крупное обновление нашего приложения. Новый интерфейс, улучшенная система навигации и множество новых функций.",
    },
  ];
  // Вакансии
  const careers = [
    {
      id: 1,
      title: "Водитель-партнер",
      type: "Полная занятость",
      location: "Москва",
      requirements: [
        "Водительские права категории B",
        "Стаж вождения от 3 лет",
        "Знание города",
        "Опрятный внешний вид",
      ],
      benefits: [
        "Гибкий график",
        "Высокий доход",
        "Бонусы за хорошие отзывы",
        "Страхование",
      ],
    },
    {
      id: 2,
      title: "Менеджер по работе с клиентами",
      type: "Полная занятость",
      location: "Москва",
      requirements: [
        "Высшее образование",
        "Опыт работы от 1 года",
        "Знание CRM систем",
        "Коммуникабельность",
      ],
      benefits: [
        "Официальное трудоустройство",
        "ДМС",
        "Корпоративное обучение",
        "Бонусы за KPI",
      ],
    },
    {
      id: 3,
      title: "Технический специалист",
      type: "Полная занятость",
      location: "Москва",
      requirements: [
        "Высшее техническое образование",
        "Знание SQL",
        "Опыт работы от 2 лет",
        "Аналитический склад ума",
      ],
      benefits: [
        "Конкурентная зарплата",
        "ДМС",
        "Современный офис",
        "Профессиональный рост",
      ],
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loginMode, setLoginMode] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedCarType, setSelectedCarType] = useState("economy");
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [price, setPrice] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [socialLinks] = useState({
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    vk: "https://vk.com",
  });
  // Инициализация карты статистики поездок
  useEffect(() => {
    if (activeTab === "profile") {
      const chartDom = document.getElementById("rides-chart");
      if (chartDom) {
        const myChart = echarts.init(chartDom);
        const option = {
          animation: false,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: [
            {
              type: "category",
              data: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл"],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: "value",
            },
          ],
          series: [
            {
              name: "Поездки",
              type: "bar",
              barWidth: "60%",
              data: [10, 15, 12, 8, 7, 11, 13],
              itemStyle: {
                color: "#FFDD2D",
              },
            },
          ],
        };
        myChart.setOption(option);
        return () => {
          myChart.dispose();
        };
      }
    }
  }, [activeTab]);
  // Расчет стоимости поездки и времени
  useEffect(() => {
    if (fromAddress && toAddress) {
      // Имитация расчета стоимости на основе типа автомобиля
      const basePrice = Math.floor(Math.random() * 300) + 100;
      let multiplier = 1;
      switch (selectedCarType) {
        case "comfort":
          multiplier = 1.5;
          break;
        case "business":
          multiplier = 2.5;
          break;
        default:
          multiplier = 1;
      }
      setPrice(Math.floor(basePrice * multiplier));
      setEstimatedTime(Math.floor(Math.random() * 30) + 10);
    }
  }, [fromAddress, toAddress, selectedCarType]);
  // Имитация отзывов
  const reviews = [
    {
      id: 1,
      name: "Анна С.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20short%20brown%20hair%2C%20smiling%2C%20on%20a%20neutral%20background%2C%20high%20quality%2C%20realistic%2C%20soft%20lighting&width=60&height=60&seq=1&orientation=squarish",
      rating: 5,
      date: "15.05.2025",
      text: "Отличный сервис! Водитель приехал вовремя, машина чистая. Буду пользоваться снова.",
    },
    {
      id: 2,
      name: "Михаил Д.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20middle-aged%20man%20with%20glasses%20and%20beard%2C%20smiling%2C%20on%20a%20neutral%20background%2C%20high%20quality%2C%20realistic%2C%20soft%20lighting&width=60&height=60&seq=2&orientation=squarish",
      rating: 4,
      date: "10.05.2025",
      text: "Хороший сервис, но приложение иногда подвисает. В целом доволен поездкой.",
    },
    {
      id: 3,
      name: "Елена В.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20woman%20with%20long%20blonde%20hair%2C%20smiling%2C%20on%20a%20neutral%20background%2C%20high%20quality%2C%20realistic%2C%20soft%20lighting&width=60&height=60&seq=3&orientation=squarish",
      rating: 5,
      date: "05.05.2025",
      text: "Всегда пользуюсь этим такси. Цены адекватные, водители вежливые.",
    },
    {
      id: 4,
      name: "Сергей К.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20man%20with%20dark%20hair%2C%20smiling%2C%20on%20a%20neutral%20background%2C%20high%20quality%2C%20realistic%2C%20soft%20lighting&width=60&height=60&seq=4&orientation=squarish",
      rating: 3,
      date: "01.05.2025",
      text: "Водитель опоздал на 10 минут, но сама поездка была комфортной.",
    },
    {
      id: 5,
      name: "Ольга М.",
      avatar:
        "https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20middle-aged%20woman%20with%20red%20hair%2C%20smiling%2C%20on%20a%20neutral%20background%2C%20high%20quality%2C%20realistic%2C%20soft%20lighting&width=60&height=60&seq=5&orientation=squarish",
      rating: 5,
      date: "28.04.2025",
      text: "Очень удобное приложение, всё интуитивно понятно. Рекомендую!",
    },
  ];
  // История поездок
  const rideHistory = [
    {
      id: 1,
      date: "15.05.2025",
      from: "ул. Ленина, 15",
      to: "ТЦ Европейский",
      price: 320,
      status: "Завершена",
    },
    {
      id: 2,
      date: "10.05.2025",
      from: "Аэропорт Шереметьево",
      to: "ул. Тверская, 8",
      price: 1250,
      status: "Завершена",
    },
    {
      id: 3,
      date: "05.05.2025",
      from: "ул. Арбат, 10",
      to: "Парк Горького",
      price: 280,
      status: "Завершена",
    },
    {
      id: 4,
      date: "01.05.2025",
      from: "Киевский вокзал",
      to: "ул. Профсоюзная, 25",
      price: 450,
      status: "Завершена",
    },
  ];
  // Переключение отзывов
  const handleNextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };
  const handlePrevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };
  // Открытие/закрытие модального окна
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  // Переключение между входом и регистрацией
  const toggleLoginMode = () => {
    setLoginMode(!loginMode);
  };
  // Имитация входа в систему
  const [userEmail, setUserEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.querySelector("#email") as HTMLInputElement)?.value;
    const password = (form.querySelector("#password") as HTMLInputElement)
      ?.value;

    if (!email || !password) {
      alert("Пожалуйста, заполните все поля");
      return;
    }

    if (loginMode) {
      setIsLoggedIn(true);
      setUserEmail(email);
      setIsModalOpen(false);
      form.reset();
    } else {
      const name = (form.querySelector("#register-name") as HTMLInputElement)
        ?.value;
      const confirmPassword = (
        form.querySelector("#confirm-password") as HTMLInputElement
      )?.value;

      if (!name) {
        alert("Пожалуйста, введите ваше имя");
        return;
      }
      if (password !== confirmPassword) {
        alert("Пароли не совпадают");
        return;
      }

      setIsLoggedIn(true);
      setUserEmail(email);
      setIsModalOpen(false);
      form.reset();
    }
  };
  // Обработка заказа такси
  const handleOrderTaxi = () => {
    if (!fromAddress || !toAddress) {
      alert("Пожалуйста, укажите адрес отправления и назначения");
      return;
    }
    if (!isLoggedIn) {
      setIsModalOpen(true);
      return;
    }
    alert(
      `Заказ принят! Стоимость поездки: ${price} ₽. Машина прибудет через ${estimatedTime} минут.`,
    );
  };
  // Обработка отправки контактной формы
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.querySelector("#name") as HTMLInputElement)?.value;
    const email = (form.querySelector("#email") as HTMLInputElement)?.value;
    const subject = (form.querySelector("#subject") as HTMLInputElement)?.value;
    const message = (form.querySelector("#message") as HTMLTextAreaElement)
      ?.value;
    if (!name || !email || !subject || !message) {
      alert("Пожалуйста, заполните все поля");
      return;
    }
    setFormSubmitted(true);
    alert("Сообщение отправлено! Мы свяжемся с вами в ближайшее время.");
    form.reset();
  };
  // Обработка социальных входов
  const handleSocialLogin = (platform: string) => {
    alert(`Вход через ${platform}`);
  };
  // Открытие магазина приложений
  const handleAppDownload = () => {
    window.open("https://play.google.com/store", "_blank");
  };
  // Открытие социальных ссылок
  const handleSocialLink = (platform: keyof typeof socialLinks) => {
    window.open(socialLinks[platform], "_blank");
  };
  // Имитация выхода из системы
  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab("main");
  };
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Верхняя навигационная панель */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <div
              className="text-2xl font-bold text-yellow-400 cursor-pointer"
              onClick={() => setActiveTab("main")}
            >
              <i className="fas fa-taxi mr-2"></i>
              <span>ТаксиПро</span>
            </div>
            <nav className="hidden md:flex ml-10 space-x-8">
              <button
                className={`${activeTab === "main" ? "text-yellow-500 font-medium" : "text-gray-600"} cursor-pointer whitespace-nowrap`}
                onClick={() => setActiveTab("main")}
              >
                Главная
              </button>
              <button
                className={`${activeTab === "tariffs" ? "text-yellow-500 font-medium" : "text-gray-600"} cursor-pointer whitespace-nowrap`}
                onClick={() => setActiveTab("tariffs")}
              >
                Тарифы
              </button>
              <button
                className={`${activeTab === "about" ? "text-yellow-500 font-medium" : "text-gray-600"} cursor-pointer whitespace-nowrap`}
                onClick={() => setActiveTab("about")}
              >
                О нас
              </button>
              <button
                className={`${activeTab === "contacts" ? "text-yellow-500 font-medium" : "text-gray-600"} cursor-pointer whitespace-nowrap`}
                onClick={() => setActiveTab("contacts")}
              >
                Контакты
              </button>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="flex items-center">
                <button
                  className="text-gray-600 mr-4 cursor-pointer whitespace-nowrap"
                  onClick={() => setActiveTab("profile")}
                >
                  <i className="fas fa-user-circle mr-2"></i>
                  Профиль
                </button>
                <button
                  className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-300 !rounded-button whitespace-nowrap"
                  onClick={handleLogout}
                >
                  Выйти
                </button>
              </div>
            ) : (
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-300 !rounded-button whitespace-nowrap"
                onClick={toggleModal}
              >
                Войти
              </button>
            )}
          </div>
        </div>
      </header>
      {/* Основное содержимое */}
      <main className="container mx-auto px-4 py-8">
        {activeTab === "main" && (
          <div>
            {/* Hero секция */}
            <div
              className="relative rounded-xl overflow-hidden mb-12 h-[500px]"
              style={{
                backgroundImage:
                  "url('https://readdy.ai/api/search-image?query=modern%20taxi%20service%20with%20yellow%20cars%20on%20city%20street%20at%20sunset%2C%20urban%20landscape%20with%20skyscrapers%2C%20professional%20photography%2C%20high%20quality%2C%20realistic%20image%2C%20gradient%20background%20from%20dark%20to%20light%20on%20the%20left%20side%20for%20text%20placement&width=1400&height=500&seq=6&orientation=landscape')",
                backgroundSize: "cover",
                backgroundPosition: "right center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent">
                <div className="max-w-lg h-full flex flex-col justify-center p-8 text-white">
                  <h1 className="text-4xl font-bold mb-4">
                    Быстрое и комфортное такси
                  </h1>
                  <p className="text-lg mb-8">
                    Закажите поездку прямо сейчас и наслаждайтесь комфортом и
                    безопасностью с нашим сервисом.
                  </p>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg transition duration-300 w-max !rounded-button whitespace-nowrap cursor-pointer">
                    Скачать приложение
                  </button>
                </div>
              </div>
            </div>
            {/* Форма заказа такси */}
            <div
              id="order-form"
              className="bg-white rounded-xl shadow-lg p-6 mb-12"
            >
              <h2 className="text-2xl font-semibold mb-6">Заказать такси</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-map-marker-alt text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                      placeholder="Откуда"
                      value={fromAddress}
                      onChange={(e) => setFromAddress(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <i className="fas fa-map-pin text-gray-400"></i>
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-10 pr-3 py-3 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                      placeholder="Куда"
                      value={toAddress}
                      onChange={(e) => setToAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Выберите тариф:
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div
                        className={`border ${selectedCarType === "economy" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"} rounded-lg p-4 cursor-pointer transition duration-200 hover:border-yellow-400`}
                        onClick={() => setSelectedCarType("economy")}
                      >
                        <div className="flex justify-center mb-2">
                          <i className="fas fa-car text-2xl text-gray-700"></i>
                        </div>
                        <h4 className="text-center font-medium">Эконом</h4>
                        <p className="text-center text-sm text-gray-500">
                          от 100 ₽
                        </p>
                      </div>
                      <div
                        className={`border ${selectedCarType === "comfort" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"} rounded-lg p-4 cursor-pointer transition duration-200 hover:border-yellow-400`}
                        onClick={() => setSelectedCarType("comfort")}
                      >
                        <div className="flex justify-center mb-2">
                          <i className="fas fa-car-side text-2xl text-gray-700"></i>
                        </div>
                        <h4 className="text-center font-medium">Комфорт</h4>
                        <p className="text-center text-sm text-gray-500">
                          от 150 ₽
                        </p>
                      </div>
                      <div
                        className={`border ${selectedCarType === "business" ? "border-yellow-400 bg-yellow-50" : "border-gray-200"} rounded-lg p-4 cursor-pointer transition duration-200 hover:border-yellow-400`}
                        onClick={() => setSelectedCarType("business")}
                      >
                        <div className="flex justify-center mb-2">
                          <i className="fas fa-car-alt text-2xl text-gray-700"></i>
                        </div>
                        <h4 className="text-center font-medium">Бизнес</h4>
                        <p className="text-center text-sm text-gray-500">
                          от 250 ₽
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="mb-6">
                    <div className="w-full h-[200px] bg-gray-200 rounded-lg mb-4 overflow-hidden">
                      {/* Здесь будет карта */}
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage:
                            "url('https://readdy.ai/api/search-image?query=city%20map%20with%20route%20marked%2C%20top%20view%2C%20minimalist%20design%2C%20light%20background%20with%20yellow%20route%20line%2C%20clean%20modern%20interface%20design&width=400&height=200&seq=7&orientation=landscape')",
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500">
                          Примерное время:
                        </p>
                        <p className="font-medium">{estimatedTime} мин</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Стоимость:</p>
                        <p className="font-medium text-xl">{price} ₽</p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleOrderTaxi}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-3 px-6 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Заказать
                  </button>
                  <div className="mt-4 flex items-center justify-center space-x-4">
                    <div className="flex items-center">
                      <i className="far fa-credit-card text-gray-400 mr-2"></i>
                      <span className="text-sm text-gray-600">Карта</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-money-bill-wave text-gray-400 mr-2"></i>
                      <span className="text-sm text-gray-600">Наличные</span>
                    </div>
                    <div className="flex items-center">
                      <i className="fas fa-wallet text-gray-400 mr-2"></i>
                      <span className="text-sm text-gray-600">Баланс</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Преимущества */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-8 text-center">
                Наши преимущества
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-bolt text-yellow-500 text-2xl"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Быстрая подача</h3>
                  <p className="text-gray-600">
                    Машина приедет в течение 5-10 минут после заказа
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-shield-alt text-yellow-500 text-2xl"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Безопасность</h3>
                  <p className="text-gray-600">
                    Все водители проходят строгую проверку и тестирование
                  </p>
                </div>
                <div className="bg-white rounded-xl shadow-md p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                      <i className="fas fa-dollar-sign text-yellow-500 text-2xl"></i>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mb-2">Выгодные цены</h3>
                  <p className="text-gray-600">
                    Прозрачное ценообразование без скрытых платежей
                  </p>
                </div>
              </div>
            </div>
            {/* Отзывы */}
            <div className="mb-12">
              <h2 className="text-2xl font-semibold mb-8 text-center">
                Отзывы клиентов
              </h2>
              <div className="bg-white rounded-xl shadow-md p-6 relative">
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={handlePrevReview}
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
                <div className="max-w-2xl mx-auto py-4">
                  <div className="flex items-start mb-4">
                    <img
                      src={reviews[currentReview].avatar}
                      alt={reviews[currentReview].name}
                      className="w-12 h-12 rounded-full mr-4 object-cover"
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium mr-2">
                          {reviews[currentReview].name}
                        </h3>
                        <span className="text-sm text-gray-500">
                          {reviews[currentReview].date}
                        </span>
                      </div>
                      <div className="flex text-yellow-400 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <i
                            key={i}
                            className={`${i < reviews[currentReview].rating ? "fas" : "far"} fa-star`}
                          ></i>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">
                    {reviews[currentReview].text}
                  </p>
                </div>
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-100 hover:bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center text-gray-600 transition duration-200 !rounded-button whitespace-nowrap cursor-pointer"
                  onClick={handleNextReview}
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
                <div className="flex justify-center mt-4">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full mx-1 ${index === currentReview ? "bg-yellow-400" : "bg-gray-300"} cursor-pointer whitespace-nowrap`}
                      onClick={() => setCurrentReview(index)}
                    ></button>
                  ))}
                </div>
              </div>
            </div>
            {/* Скачать приложение */}
            <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-xl p-8 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4 text-gray-800">
                    Скачайте наше приложение
                  </h2>
                  <p className="text-gray-800 mb-6">
                    Получите доступ ко всем функциям нашего сервиса прямо в
                    вашем смартфоне. Заказывайте такси в любое время и в любом
                    месте!
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button className="bg-black text-white py-3 px-6 rounded-lg flex items-center !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fab fa-apple text-2xl mr-2"></i>
                      <div className="text-left">
                        <div className="text-xs">Скачать в</div>
                        <div className="font-medium">App Store</div>
                      </div>
                    </button>
                    <button className="bg-black text-white py-3 px-6 rounded-lg flex items-center !rounded-button whitespace-nowrap cursor-pointer">
                      <i className="fab fa-google-play text-2xl mr-2"></i>
                      <div className="text-left">
                        <div className="text-xs">Доступно в</div>
                        <div className="font-medium">Google Play</div>
                      </div>
                    </button>
                  </div>
                </div>
                <div className="flex justify-center">
                  <img
                    src="https://readdy.ai/api/search-image?query=smartphone%20displaying%20taxi%20app%20interface%20with%20map%20and%20booking%20screen%2C%20modern%20design%2C%20yellow%20accents%2C%20realistic%20mockup%20on%20transparent%20background%2C%20high%20quality%20render&width=300&height=500&seq=8&orientation=portrait"
                    alt="Мобильное приложение"
                    className="max-h-[400px] rounded-xl shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "profile" && isLoggedIn && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6">Личный кабинет</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-1">
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <div className="mb-4 flex justify-center">
                    <div className="relative">
                      <img
                        src="https://readdy.ai/api/search-image?query=professional%20portrait%20photo%20of%20a%20young%20man%20with%20short%20dark%20hair%2C%20smiling%2C%20on%20a%20neutral%20background%2C%20high%20quality%2C%20realistic%2C%20soft%20lighting&width=120&height=120&seq=9&orientation=squarish"
                        alt="Аватар пользователя"
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <button className="absolute bottom-0 right-0 bg-yellow-400 rounded-full w-8 h-8 flex items-center justify-center text-gray-800 shadow-md cursor-pointer whitespace-nowrap">
                        <i className="fas fa-camera"></i>
                      </button>
                    </div>
                  </div>
                  <h3 className="text-xl font-medium">Александр Петров</h3>
                  <p className="text-gray-500 mb-4">{userEmail}</p>
                  <div className="flex justify-center space-x-2">
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                      <i className="fas fa-star mr-1"></i>
                      4.9
                    </div>
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      <i className="fas fa-car mr-1"></i>
                      25 поездок
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">Способы оплаты</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <i className="far fa-credit-card text-gray-400 mr-3 text-xl"></i>
                        <div>
                          <p className="font-medium">**** 4582</p>
                          <p className="text-xs text-gray-500">
                            Visa, до 06/27
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded mr-2">
                          Основная
                        </span>
                        <button className="text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200">
                      <div className="flex items-center">
                        <i className="far fa-credit-card text-gray-400 mr-3 text-xl"></i>
                        <div>
                          <p className="font-medium">**** 7891</p>
                          <p className="text-xs text-gray-500">
                            MasterCard, до 03/26
                          </p>
                        </div>
                      </div>
                      <button className="text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap">
                        <i className="fas fa-ellipsis-v"></i>
                      </button>
                    </div>
                    <button className="w-full flex items-center justify-center py-2 text-yellow-500 hover:text-yellow-600 cursor-pointer whitespace-nowrap">
                      <i className="fas fa-plus mr-2"></i>
                      Добавить карту
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4">История поездок</h3>
                  <div className="space-y-4">
                    {rideHistory.map((ride) => (
                      <div
                        key={ride.id}
                        className="bg-white rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="text-sm text-gray-500">{ride.date}</p>
                            <div className="flex items-center mt-1">
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${ride.status === "Завершена" ? "bg-green-500" : "bg-yellow-500"} mr-2`}
                              ></span>
                              <p className="text-sm">{ride.status}</p>
                            </div>
                          </div>
                          <p className="font-medium">{ride.price} ₽</p>
                        </div>
                        <div className="flex items-start">
                          <div className="flex flex-col items-center mr-3">
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                            <div className="w-0.5 h-10 bg-gray-300 my-1"></div>
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          </div>
                          <div>
                            <p className="text-sm">{ride.from}</p>
                            <p className="text-sm mt-8">{ride.to}</p>
                          </div>
                        </div>
                        <div className="flex justify-end mt-3">
                          <button className="text-yellow-500 hover:text-yellow-600 text-sm cursor-pointer whitespace-nowrap">
                            Подробнее
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium mb-4">
                    Статистика поездок
                  </h3>
                  <div id="rides-chart" className="w-full h-64"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "tariffs" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Наши тарифы
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-car text-yellow-500 text-2xl"></i>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-center mb-4">Эконом</h3>
                <p className="text-center text-gray-500 mb-6">
                  Оптимальное соотношение цены и качества для ежедневных поездок
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Минимальная стоимость</span>
                    <span className="font-medium">100 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость за км</span>
                    <span className="font-medium">12 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость за минуту</span>
                    <span className="font-medium">3 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ожидание</span>
                    <span className="font-medium">5 ₽/мин</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCarType("economy");
                    setActiveTab("main");
                    const orderFormElement =
                      document.getElementById("order-form");
                    if (orderFormElement) {
                      setTimeout(() => {
                        orderFormElement.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Выбрать
                </button>
              </div>
              <div className="border-2 border-yellow-400 rounded-xl p-6 shadow-md relative">
                <div className="absolute top-0 right-0 bg-yellow-400 text-gray-800 px-4 py-1 rounded-bl-lg font-medium text-sm">
                  Популярный
                </div>
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-car-side text-yellow-500 text-2xl"></i>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-center mb-4">
                  Комфорт
                </h3>
                <p className="text-center text-gray-500 mb-6">
                  Комфортные автомобили для тех, кто ценит удобство
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Минимальная стоимость</span>
                    <span className="font-medium">150 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость за км</span>
                    <span className="font-medium">18 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость за минуту</span>
                    <span className="font-medium">4 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ожидание</span>
                    <span className="font-medium">6 ₽/мин</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCarType("economy");
                    setActiveTab("main");
                    const orderFormElement =
                      document.getElementById("order-form");
                    if (orderFormElement) {
                      setTimeout(() => {
                        orderFormElement.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Выбрать
                </button>
              </div>
              <div className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition duration-300">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                    <i className="fas fa-car-alt text-yellow-500 text-2xl"></i>
                  </div>
                </div>
                <h3 className="text-xl font-medium text-center mb-4">Бизнес</h3>
                <p className="text-center text-gray-500 mb-6">
                  Премиальные автомобили для деловых встреч и особых случаев
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Минимальная стоимость</span>
                    <span className="font-medium">250 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость за км</span>
                    <span className="font-medium">25 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Стоимость за минуту</span>
                    <span className="font-medium">6 ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Ожидание</span>
                    <span className="font-medium">8 ₽/мин</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedCarType("economy");
                    setActiveTab("main");
                    const orderFormElement =
                      document.getElementById("order-form");
                    if (orderFormElement) {
                      setTimeout(() => {
                        orderFormElement.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  Выбрать
                </button>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-medium mb-6">
                Дополнительные услуги
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-suitcase text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Перевозка багажа</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Дополнительное место для багажа
                  </p>
                  <p className="text-right font-medium mt-2">+50 ₽</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-baby text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Детское кресло</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Безопасная перевозка детей
                  </p>
                  <p className="text-right font-medium mt-2">+100 ₽</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-paw text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Перевозка животных</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Комфортная поездка с питомцем
                  </p>
                  <p className="text-right font-medium mt-2">+80 ₽</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-user-friends text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Встреча с табличкой</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Для встречи в аэропорту или на вокзале
                  </p>
                  <p className="text-right font-medium mt-2">+150 ₽</p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "about" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              О нашей компании
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
              <div>
                <h3 className="text-xl font-medium mb-4">Наша миссия</h3>
                <p className="text-gray-600 mb-4">
                  Мы стремимся сделать передвижение по городу максимально
                  удобным, безопасным и доступным для каждого. Наша цель —
                  предоставить сервис такси, который превосходит ожидания
                  клиентов и устанавливает новые стандарты качества в индустрии.
                </p>
                <p className="text-gray-600">
                  С момента основания в 2015 году, мы постоянно развиваемся и
                  совершенствуем наш сервис, внедряя инновационные технологии и
                  улучшая качество обслуживания.
                </p>
              </div>
              <div className="flex justify-center">
                <img
                  src="https://readdy.ai/api/search-image?query=modern%20taxi%20company%20office%20with%20yellow%20brand%20elements%2C%20professional%20business%20environment%2C%20team%20working%2C%20clean%20and%20bright%20space%2C%20high%20quality%20corporate%20photography&width=500&height=300&seq=10&orientation=landscape"
                  alt="О компании"
                  className="rounded-lg shadow-md max-w-full"
                />
              </div>
            </div>
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-6 text-center">
                Наши достижения
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    5+
                  </div>
                  <p className="text-gray-600">Лет на рынке</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    1000+
                  </div>
                  <p className="text-gray-600">Водителей</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    500K+
                  </div>
                  <p className="text-gray-600">Выполненных заказов</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="text-3xl font-bold text-yellow-500 mb-2">
                    4.9
                  </div>
                  <p className="text-gray-600">Средний рейтинг</p>
                </div>
              </div>
            </div>
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-6">Наша команда</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20man%20in%20business%20attire%2C%20confident%20expression%2C%20neutral%20background%2C%20corporate%20portrait%2C%20high%20quality&width=150&height=150&seq=11&orientation=squarish"
                    alt="Директор"
                    className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h4 className="font-medium">Андрей Смирнов</h4>
                  <p className="text-sm text-gray-500">Генеральный директор</p>
                </div>
                <div className="text-center">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20woman%20with%20glasses%20in%20business%20attire%2C%20confident%20expression%2C%20neutral%20background%2C%20corporate%20portrait%2C%20high%20quality&width=150&height=150&seq=12&orientation=squarish"
                    alt="Операционный директор"
                    className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h4 className="font-medium">Елена Козлова</h4>
                  <p className="text-sm text-gray-500">Операционный директор</p>
                </div>
                <div className="text-center">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20young%20man%20in%20casual%20business%20attire%2C%20confident%20expression%2C%20neutral%20background%2C%20corporate%20portrait%2C%20high%20quality&width=150&height=150&seq=13&orientation=squarish"
                    alt="Технический директор"
                    className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h4 className="font-medium">Максим Иванов</h4>
                  <p className="text-sm text-gray-500">Технический директор</p>
                </div>
                <div className="text-center">
                  <img
                    src="https://readdy.ai/api/search-image?query=professional%20headshot%20of%20a%20middle-aged%20woman%20in%20business%20attire%2C%20confident%20expression%2C%20neutral%20background%2C%20corporate%20portrait%2C%20high%20quality&width=150&height=150&seq=14&orientation=squarish"
                    alt="Маркетинг директор"
                    className="w-32 h-32 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h4 className="font-medium">Ольга Петрова</h4>
                  <p className="text-sm text-gray-500">
                    Директор по маркетингу
                  </p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6">Наши партнеры</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-center">
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <i className="fab fa-cc-visa text-3xl text-blue-600"></i>
                  <span className="mt-2 text-sm font-medium">Visa</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <i className="fab fa-cc-mastercard text-3xl text-red-500"></i>
                  <span className="mt-2 text-sm font-medium">MasterCard</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <i className="fab fa-paypal text-3xl text-blue-800"></i>
                  <span className="mt-2 text-sm font-medium">PayPal</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <i className="fas fa-hotel text-3xl text-purple-600"></i>
                  <span className="mt-2 text-sm font-medium">Отели.ру</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <i className="fas fa-plane text-3xl text-cyan-600"></i>
                  <span className="mt-2 text-sm font-medium">Авиалинии</span>
                </div>
                <div className="flex flex-col items-center justify-center p-4 bg-gray-50 rounded-lg h-24">
                  <i className="fas fa-building text-3xl text-gray-700"></i>
                  <span className="mt-2 text-sm font-medium">
                    Бизнес-центры
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "news" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Новости компании
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {news.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <div className="text-sm text-gray-500 mb-2">
                      {item.date}
                    </div>
                    <h3 className="text-xl font-medium mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.text}</p>
                    <button className="mt-4 text-yellow-500 hover:text-yellow-600 cursor-pointer whitespace-nowrap">
                      Читать далее
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "careers" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Вакансии
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {careers.map((job) => (
                <div key={job.id} className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-medium mb-2">{job.title}</h3>
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm">
                      {job.type}
                    </span>
                    <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-sm">
                      {job.location}
                    </span>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Требования:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Мы предлагаем:</h4>
                    <ul className="list-disc list-inside text-gray-600 space-y-1">
                      {job.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-300 w-full !rounded-button whitespace-nowrap cursor-pointer">
                    Откликнуться
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeTab === "how-to-order" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Как заказать такси
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-mobile-alt text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Шаг 1: Выберите способ заказа
                </h3>
                <p className="text-gray-600">
                  Закажите такси через мобильное приложение, веб-сайт или
                  позвоните нам
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-map-marker-alt text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Шаг 2: Укажите адрес
                </h3>
                <p className="text-gray-600">
                  Введите адрес отправления и назначения
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="fas fa-car text-yellow-500 text-2xl"></i>
                </div>
                <h3 className="text-xl font-medium mb-2">
                  Шаг 3: Выберите тариф
                </h3>
                <p className="text-gray-600">
                  Выберите подходящий тариф и дополнительные услуги
                </p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-medium mb-6 text-center">
                Способы заказа
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-mobile-alt text-yellow-500 text-xl"></i>
                    </div>
                    <h4 className="text-lg font-medium">
                      Мобильное приложение
                    </h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Скачайте наше приложение для iOS или Android и заказывайте
                    такси в пару кликов
                  </p>
                  <div className="flex space-x-2">
                    <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center text-sm !rounded-button whitespace-nowrap">
                      <i className="fab fa-apple mr-2"></i>
                      App Store
                    </button>
                    <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center text-sm !rounded-button whitespace-nowrap">
                      <i className="fab fa-google-play mr-2"></i>
                      Google Play
                    </button>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-globe text-yellow-500 text-xl"></i>
                    </div>
                    <h4 className="text-lg font-medium">Веб-сайт</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Закажите такси прямо на нашем сайте без установки приложения
                  </p>
                  <button
                    onClick={() => setActiveTab("main")}
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg text-sm !rounded-button whitespace-nowrap"
                  >
                    Заказать на сайте
                  </button>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-phone-alt text-yellow-500 text-xl"></i>
                    </div>
                    <h4 className="text-lg font-medium">По телефону</h4>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Позвоните нам, и наши операторы примут ваш заказ
                  </p>
                  <div className="text-lg font-medium text-yellow-500">
                    +7 (495) 123-45-67
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-12">
              <h3 className="text-xl font-medium mb-6">Дополнительные опции</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-clock text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Предварительный заказ</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Закажите такси заранее на нужное время
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-route text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Несколько адресов</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Укажите несколько точек маршрута
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-comments text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Пожелания водителю</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Оставьте комментарий к заказу
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-star text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Любимый водитель</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Выберите предпочитаемого водителя
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "payment-methods" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Способы оплаты
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <i className="far fa-credit-card text-yellow-500 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium">Банковской картой</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Оплачивайте поездки любой банковской картой через безопасный
                  платежный шлюз
                </p>
                <div className="flex space-x-2">
                  <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                  <i className="fab fa-cc-mastercard text-2xl text-red-500"></i>
                  <i className="fab fa-cc-jcb text-2xl text-green-600"></i>
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-wallet text-yellow-500 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium">Наличными</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Оплачивайте поездку наличными непосредственно водителю
                </p>
                <div className="text-sm text-gray-500">
                  <i className="fas fa-info-circle mr-2"></i>
                  Водитель подготовит сдачу
                </div>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                    <i className="fas fa-building text-yellow-500 text-xl"></i>
                  </div>
                  <h3 className="text-lg font-medium">Корпоративный счет</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  Специальное предложение для компаний с автоматической оплатой
                  поездок
                </p>
                <button className="text-yellow-500 hover:text-yellow-600 text-sm cursor-pointer whitespace-nowrap">
                  Подключить корпоративный счет
                </button>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-medium mb-6 text-center">
                Преимущества безналичной оплаты
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-shield-alt text-yellow-500"></i>
                  </div>
                  <h4 className="font-medium mb-2">Безопасность</h4>
                  <p className="text-sm text-gray-600">
                    Защищенные платежи и шифрование данных
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-history text-yellow-500"></i>
                  </div>
                  <h4 className="font-medium mb-2">История платежей</h4>
                  <p className="text-sm text-gray-600">
                    Отслеживайте все свои поездки
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-percentage text-yellow-500"></i>
                  </div>
                  <h4 className="font-medium mb-2">Бонусы</h4>
                  <p className="text-sm text-gray-600">
                    Накапливайте баллы за поездки
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-receipt text-yellow-500"></i>
                  </div>
                  <h4 className="font-medium mb-2">Чеки</h4>
                  <p className="text-sm text-gray-600">
                    Автоматическое получение чеков
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "faq" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Часто задаваемые вопросы
            </h2>
            <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Основные вопросы</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Как отследить статус заказа?
                    </h4>
                    <p className="text-gray-600">
                      Статус заказа можно отследить в приложении или на сайте в
                      режиме реального времени. Вы увидите местоположение
                      водителя и примерное время прибытия.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Что делать, если водитель не приехал?
                    </h4>
                    <p className="text-gray-600">
                      Если водитель задерживается, вы можете связаться с ним
                      через приложение или позвонить в службу поддержки.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Как оставить отзыв о поездке?
                    </h4>
                    <p className="text-gray-600">
                      После завершения поездки вы можете оставить отзыв и оценку
                      в приложении или на сайте.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Оплата и тарифы</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Как формируется стоимость поездки?
                    </h4>
                    <p className="text-gray-600">
                      Стоимость поездки зависит от выбранного тарифа,
                      расстояния, времени в пути и текущего спроса.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Можно ли оплатить поездку частично бонусами?
                    </h4>
                    <p className="text-gray-600">
                      Да, вы можете использовать накопленные бонусы для
                      частичной или полной оплаты поездки.
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium mb-4">Безопасность</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">
                      Как проверяются водители?
                    </h4>
                    <p className="text-gray-600">
                      Все водители проходят тщательную проверку документов,
                      медицинское освидетельствование и тестирование.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">
                      Застрахованы ли поездки?
                    </h4>
                    <p className="text-gray-600">
                      Да, все поездки застрахованы. Страховка включает
                      ответственность перед пассажирами и их имуществом.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "ride-rules" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Правила поездки
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-medium mb-6">Общие правила</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-check text-yellow-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Пунктуальность</h4>
                      <p className="text-gray-600">
                        Водитель ожидает пассажира в течение 5 минут после
                        прибытия на место заказа
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-check text-yellow-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        Количество пассажиров
                      </h4>
                      <p className="text-gray-600">
                        Количество пассажиров не должно превышать количество
                        мест в автомобиле
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-check text-yellow-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Багаж</h4>
                      <p className="text-gray-600">
                        Габариты багажа должны соответствовать вместимости
                        багажного отделения
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-6">
                  Правила безопасности
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-times text-red-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Запрещено курение</h4>
                      <p className="text-gray-600">
                        Курение в салоне автомобиля строго запрещено
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-times text-red-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Запрещен алкоголь</h4>
                      <p className="text-gray-600">
                        Употребление алкогольных напитков в салоне запрещено
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4 mt-1">
                      <i className="fas fa-times text-red-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">
                        Запрещены опасные грузы
                      </h4>
                      <p className="text-gray-600">
                        Перевозка опасных и запрещенных веществ не допускается
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-8">
              <h3 className="text-xl font-medium mb-6 text-center">
                Рекомендации для комфортной поездки
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-temperature-low text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Климат-контроль</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Вы можете попросить водителя отрегулировать температуру в
                    салоне
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-music text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Музыка</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Вы можете попросить включить/выключить музыку или
                    отрегулировать громкость
                  </p>
                </div>
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-3">
                      <i className="fas fa-route text-yellow-500"></i>
                    </div>
                    <h4 className="font-medium">Маршрут</h4>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Вы можете предложить свой предпочтительный маршрут
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "loyalty" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Программа лояльности
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-medium mb-6">Как это работает</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-500 font-medium">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Совершайте поездки</h4>
                      <p className="text-gray-600">
                        За каждую поездку вы получаете баллы: 1 балл = 1 рубль
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-500 font-medium">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Накапливайте баллы</h4>
                      <p className="text-gray-600">
                        Баллы суммируются и хранятся на вашем счету
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-yellow-500 font-medium">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Оплачивайте поездки</h4>
                      <p className="text-gray-600">
                        Используйте накопленные баллы для оплаты поездок
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-xl font-medium mb-6">Уровни программы</h3>
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-star text-yellow-400 mr-2"></i>
                      <h4 className="font-medium">Базовый</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">0-5000 баллов</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 1% кэшбэк баллами</li>
                      <li>• Скидка 5% в день рождения</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-star text-yellow-400 mr-2"></i>
                      <i className="fas fa-star text-yellow-400 mr-2"></i>
                      <h4 className="font-medium">Серебряный</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      5001-15000 баллов
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 3% кэшбэк баллами</li>
                      <li>• Скидка 10% в день рождения</li>
                      <li>• Приоритетная поддержка</li>
                    </ul>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-star text-yellow-400 mr-2"></i>
                      <i className="fas fa-star text-yellow-400 mr-2"></i>
                      <i className="fas fa-star text-yellow-400 mr-2"></i>
                      <h4 className="font-medium">Золотой</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">15001+ баллов</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• 5% кэшбэк баллами</li>
                      <li>• Скидка 15% в день рождения</li>
                      <li>• VIP поддержка 24/7</li>
                      <li>• Бесплатное ожидание до 15 минут</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-yellow-50 rounded-xl p-8 mb-12">
              <h3 className="text-xl font-medium mb-6 text-center">
                Специальные предложения
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-gift text-yellow-500 text-xl"></i>
                  </div>
                  <h4 className="font-medium mb-2">Приведи друга</h4>
                  <p className="text-gray-600 text-sm">
                    Получите 500 баллов за каждого приглашенного друга
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-calendar-alt text-yellow-500 text-xl"></i>
                  </div>
                  <h4 className="font-medium mb-2">Счастливые часы</h4>
                  <p className="text-gray-600 text-sm">
                    Двойные баллы в определенные часы
                  </p>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-sm">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                    <i className="fas fa-percentage text-yellow-500 text-xl"></i>
                  </div>
                  <h4 className="font-medium mb-2">Сезонные акции</h4>
                  <p className="text-gray-600 text-sm">
                    Специальные предложения в праздничные дни
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === "contacts" && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-8 text-center">
              Контактная информация
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div>
                <h3 className="text-xl font-medium mb-6">Свяжитесь с нами</h3>
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-map-marker-alt text-yellow-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Адрес</h4>
                      <p className="text-gray-600">
                        г. Москва, ул. Тверская, 25, офис 301
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-phone-alt text-yellow-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Телефон</h4>
                      <p className="text-gray-600">+7 (495) 123-45-67</p>
                      <p className="text-gray-600">
                        +7 (800) 123-45-67 (бесплатно по России)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-envelope text-yellow-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-gray-600">info@taxipro.ru</p>
                      <p className="text-gray-600">support@taxipro.ru</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                      <i className="fas fa-clock text-yellow-500"></i>
                    </div>
                    <div>
                      <h4 className="font-medium">Режим работы</h4>
                      <p className="text-gray-600">Пн-Пт: 9:00 - 20:00</p>
                      <p className="text-gray-600">Сб-Вс: 10:00 - 18:00</p>
                    </div>
                  </div>
                </div>
                <h4 className="font-medium mb-3">Мы в социальных сетях</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-400 text-white rounded-full flex items-center justify-center hover:bg-blue-500 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-pink-600 text-white rounded-full flex items-center justify-center hover:bg-pink-700 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-900 transition duration-300 cursor-pointer"
                  >
                    <i className="fab fa-vk"></i>
                  </a>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-medium mb-6">Напишите нам</h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                      placeholder="Введите ваш email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Тема
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                      placeholder="Введите тему сообщения"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Сообщение
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                      placeholder="Введите ваше сообщение"
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-6 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
                  >
                    Отправить
                  </button>
                </form>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-6">Мы на карте</h3>
              <div className="w-full h-[400px] bg-gray-200 rounded-lg overflow-hidden">
                <img
                  src="https://readdy.ai/api/search-image?query=city%20map%20showing%20location%20of%20office%20in%20downtown%20area%2C%20satellite%20view%20with%20marker%20pin%2C%20detailed%20urban%20landscape%2C%20high%20quality&width=1200&height=400&seq=15&orientation=landscape"
                  alt="Карта"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Футер */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-yellow-400 mb-4">
                <i className="fas fa-taxi mr-2"></i>
                <span>ТаксиПро</span>
              </div>
              <p className="text-gray-400 mb-4">
                Быстрое и комфортное такси для любых поездок по городу и за его
                пределами.
              </p>
              <div className="flex space-x-4">
                <a
                  onClick={() => handleSocialLink("facebook")}
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a
                  onClick={() => handleSocialLink("twitter")}
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-twitter"></i>
                </a>
                <a
                  onClick={() => handleSocialLink("instagram")}
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
                <a
                  onClick={() => handleSocialLink("youtube")}
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-youtube"></i>
                </a>
                <a
                  onClick={() => handleSocialLink("vk")}
                  className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                >
                  <i className="fab fa-vk"></i>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Информация</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    onClick={() => setActiveTab("about")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    О компании
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("tariffs")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Тарифы
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("news")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Новости
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("careers")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Вакансии
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("contacts")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Контакты
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Для клиентов</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    onClick={() => setActiveTab("how-to-order")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Как заказать
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("payment-methods")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Способы оплаты
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("faq")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Часто задаваемые вопросы
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("ride-rules")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Правила поездки
                  </a>
                </li>
                <li>
                  <a
                    onClick={() => setActiveTab("loyalty")}
                    className="text-gray-400 hover:text-white transition duration-300 cursor-pointer"
                  >
                    Программа лояльности
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4">Контакты</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-map-marker-alt text-yellow-400 mr-2"></i>
                  <span className="text-gray-400">
                    г. Москва, ул. Тверская, 25
                  </span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-phone-alt text-yellow-400 mr-2"></i>
                  <span className="text-gray-400">+7 (495) 123-45-67</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-envelope text-yellow-400 mr-2"></i>
                  <span className="text-gray-400">info@taxipro.ru</span>
                </li>
                <li className="flex items-center">
                  <i className="fas fa-clock text-yellow-400 mr-2"></i>
                  <span className="text-gray-400">Пн-Вс: 24/7</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 ТаксиПро. Все права защищены.
            </p>
            <div className="flex flex-wrap justify-center space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition duration-300 mb-2 md:mb-0 cursor-pointer"
              >
                Политика конфиденциальности
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition duration-300 mb-2 md:mb-0 cursor-pointer"
              >
                Пользовательское соглашение
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white text-sm transition duration-300 mb-2 md:mb-0 cursor-pointer"
              >
                Правовая информация
              </a>
            </div>
          </div>
        </div>
      </footer>
      {/* Модальное окно авторизации */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                {loginMode ? "Вход в аккаунт" : "Регистрация"}
              </h2>
              <button
                className="text-gray-400 hover:text-gray-600 cursor-pointer whitespace-nowrap"
                onClick={toggleModal}
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              {!loginMode && (
                <div>
                  <label
                    htmlFor="register-name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Ваше имя
                  </label>
                  <input
                    type="text"
                    id="register-name"
                    className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                    placeholder="Введите ваше имя"
                  />
                </div>
              )}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                  placeholder="Введите ваш email"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Пароль
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                  placeholder="Введите ваш пароль"
                />
              </div>
              {!loginMode && (
                <div>
                  <label
                    htmlFor="confirm-password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Подтверждение пароля
                  </label>
                  <input
                    type="password"
                    id="confirm-password"
                    className="w-full px-4 py-2 border-gray-300 rounded-lg bg-gray-50 focus:ring-yellow-500 focus:border-yellow-500 text-sm border-none"
                    placeholder="Подтвердите ваш пароль"
                  />
                </div>
              )}
              {loginMode && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-700"
                    >
                      Запомнить меня
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="text-yellow-500 hover:text-yellow-600 cursor-pointer"
                    >
                      Забыли пароль?
                    </a>
                  </div>
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-800 py-2 px-4 rounded-lg transition duration-300 !rounded-button whitespace-nowrap cursor-pointer"
              >
                {loginMode ? "Войти" : "Зарегистрироваться"}
              </button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Или войдите через
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => handleSocialLogin("Google")}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fab fa-google text-red-500"></i>
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fab fa-facebook-f text-blue-600"></i>
                </button>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 !rounded-button whitespace-nowrap cursor-pointer"
                >
                  <i className="fab fa-vk text-blue-800"></i>
                </button>
              </div>
            </div>
            <div className="mt-6 text-center text-sm">
              <span className="text-gray-600">
                {loginMode ? "Нет аккаунта?" : "Уже есть аккаунт?"}
              </span>
              <button
                className="ml-1 text-yellow-500 hover:text-yellow-600 cursor-pointer whitespace-nowrap"
                onClick={toggleLoginMode}
              >
                {loginMode ? "Зарегистрироваться" : "Войти"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
