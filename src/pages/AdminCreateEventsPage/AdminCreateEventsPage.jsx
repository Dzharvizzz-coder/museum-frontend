import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Добавляем useLocation
import './AdminEventsPage.scss';
import Logo from '../../components/Logo/Logo';
import doneIcon from '../../assets/images/MainImages/done.png';

const AdminCreateEventsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visitorCategories, setVisitorCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [eventData, setEventData] = useState({
    name: '',
    description: '',
    disabilities: false,
    location_id: 0,
    genre_id: 0,
    visitor_category: [],
    tag: [],
  });
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Получаем текущий путь

  // Определяем активный пункт меню
  const isCreateEventPage = location.pathname === '/admin/create/event';

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const authHeader = `Basic ${btoa('admin:admin')}`;

        const [categoriesResponse, locationsResponse, genresResponse, tagsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/event/visitor_categories`, {
            headers: { Authorization: authHeader },
          }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/event/locations`, {
            headers: { Authorization: authHeader },
          }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/event/genres`, {
            headers: { Authorization: authHeader },
          }),
          fetch(`${import.meta.env.VITE_API_BASE_URL}/event/tags`, {
            headers: { Authorization: authHeader },
          }),
        ]);

        if (!categoriesResponse.ok || !locationsResponse.ok || !genresResponse.ok || !tagsResponse.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        const [categoriesData, locationsData, genresData, tagsData] = await Promise.all([
          categoriesResponse.json(),
          locationsResponse.json(),
          genresResponse.json(),
          tagsResponse.json(),
        ]);

        setVisitorCategories(categoriesData);
        setLocations(locationsData);
        setGenres(genresData);
        setTags(tagsData);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Ошибка');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setEventData((prevData) => {
      const isSelected = prevData.visitor_category.some((cat) => cat.id === categoryId);
      if (isSelected) {
        return {
          ...prevData,
          visitor_category: prevData.visitor_category.filter((cat) => cat.id !== categoryId),
        };
      } else {
        const category = visitorCategories.find((cat) => cat.id === categoryId);
        return {
          ...prevData,
          visitor_category: [...prevData.visitor_category, category],
        };
      }
    });
  };

  const handleTagChange = (tagId) => {
    setEventData((prevData) => {
      const isSelected = prevData.tag.some((t) => t.id === tagId);
      if (isSelected) {
        return {
          ...prevData,
          tag: prevData.tag.filter((t) => t.id !== tagId),
        };
      } else {
        const tag = tags.find((t) => t.id === tagId);
        return {
          ...prevData,
          tag: [...prevData.tag, tag],
        };
      }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleCreateEvent = async () => {
    try {
      const authHeader = `Basic ${btoa('admin:admin')}`;

      // Создаем мероприятие
      const createEventResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/event`, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: eventData.name,
          description: eventData.description,
          disabilities: eventData.disabilities,
          location_id: eventData.location_id,
          genre_id: eventData.genre_id,
          visitor_category: eventData.visitor_category.map((cat) => cat.id),
          tag: eventData.tag.map((t) => t.id),
        }),
      });

      if (!createEventResponse.ok) {
        throw new Error('Ошибка при создании мероприятия');
      }

      const createdEvent = await createEventResponse.json();

      // Если файл был выбран, загружаем его
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadLogoResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/event/${createdEvent.id}/upload_logo`,
          {
            method: 'POST',
            headers: {
              Authorization: authHeader,
            },
            body: formData,
          }
        );

        if (!uploadLogoResponse.ok) {
          throw new Error('Ошибка при загрузке логотипа');
        }
      }

      // Открываем модальное окно
      setIsSuccessModalOpen(true);

      // Через 3 секунды перенаправляем на страницу мероприятий
      setTimeout(() => {
        setIsSuccessModalOpen(false);
        navigate('/admin/events');
      }, 3000);
    } catch (error) {
      setError(error.message || 'Ошибка');
    }
  };

  return (
    <div className="admin-events-page">
      <header className="admin-header">
        <h1>Музей Истории Екатеринбурга</h1>
        <Logo />
      </header>
      <div className="admin-body">
        <div className="sidebar">
          {/* Кнопка "Каталог мероприятий" */}
          <div
            className={`menu-item ${!isCreateEventPage ? 'active' : ''}`}
            onClick={() => navigate('/admin/events')}
          >
            Каталог мероприятий
          </div>
          {/* Кнопка "Создать новое мероприятие" */}
          <div
            className={`menu-item ${isCreateEventPage ? 'active' : ''}`}
            onClick={() => navigate('/admin/create/event')}
          >
            Создать новое мероприятие
          </div>
        </div>
        <div className="content">
          {loading ? (
            <p>Загрузка...</p>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="edit-form">
              <div className="form-container">
                <div className="form-fields">
                  <div className="form-group">
                    <label>
                      Название мероприятия <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={eventData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Адрес <span className="required">*</span>
                    </label>
                    <select
                      name="location_id"
                      value={eventData.location_id}
                      onChange={handleInputChange}
                      className="styled-select"
                    >
                      <option value={0}>Выберите адрес</option>
                      {locations.map((location) => (
                        <option key={location.id} value={location.id}>
                          {location.name} - {location.address}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>
                      Экскурсовод
                    </label>
                    <input
                      type="text"
                      name="guide"
                      value={eventData.guide}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group no-border">
                    <label>
                      Инклюзивность <span className="required">*</span>
                    </label>
                    <div>
                      <label>
                        <input
                          type="checkbox"
                          name="disabilities"
                          checked={eventData.disabilities}
                          onChange={handleCheckboxChange}
                        />
                        Да
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="disabilities"
                          checked={!eventData.disabilities}
                          onChange={(e) => handleCheckboxChange({ ...e, target: { ...e.target, checked: !e.target.checked } })}
                        />
                        Нет
                      </label>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      Тип мероприятия <span className="required">*</span>
                    </label>
                    <select
                      name="genre_id"
                      value={eventData.genre_id}
                      onChange={handleInputChange}
                      className="styled-select"
                    >
                      <option value={0}>Выберите тип мероприятия</option>
                      {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>
                          {genre.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group no-border">
                    <label>
                      Возраст <span className="required">*</span>
                    </label>
                    <div className="category-checkboxes">
                      {visitorCategories.map((category) => (
                        <label key={category.id}>
                          <input
                            type="checkbox"
                            checked={eventData.visitor_category.some((cat) => cat.id === category.id)}
                            onChange={() => handleCategoryChange(category.id)}
                          />
                          {category.name}
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="form-group no-border">
                    <label>
                      Тэги <span className="required">*</span>
                    </label>
                    <div className="tags-container">
                      {tags.map((tag) => (
                        <div
                          key={tag.id}
                          className={`tag ${eventData.tag.some((t) => t.id === tag.id) ? 'selected' : ''}`}
                          onClick={() => handleTagChange(tag.id)}
                        >
                          {tag.name}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>
                      Описание <span className="required">*</span>
                    </label>
                    <textarea
                      name="description"
                      value={eventData.description}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Загрузите фото <span className="required">*</span>
                    </label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="save-button-container">
                    <button className="save-button" onClick={handleCreateEvent}>
                      Создать
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Модальное окно успешного создания мероприятия */}
      {isSuccessModalOpen && (
        <div className="success-modal">
          <img src={doneIcon} alt="Done" width={30} height={30} />
          <p>Мероприятие успешно создано</p>
        </div>
      )}
    </div>
  );
};

export default AdminCreateEventsPage;