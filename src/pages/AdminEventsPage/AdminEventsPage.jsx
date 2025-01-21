import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './AdminEventsPage.scss';
import Logo from '../../components/Logo/Logo';
import editIcon from '../../assets/images/MainImages/editIcon.png';
import trashIcon from '../../assets/images/MainImages/trashIcon.png';
import doneIcon from '../../assets/images/MainImages/done.png';

const AdminEventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isUpdateSuccessModalOpen, setIsUpdateSuccessModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedEventTickets, setSelectedEventTickets] = useState([]);
  const [visitorCategories, setVisitorCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [genres, setGenres] = useState([]);
  const [tags, setTags] = useState([]);
  const [file, setFile] = useState(null);
  const [isAddTicketModalOpen, setIsAddTicketModalOpen] = useState(false);
  const [ticketData, setTicketData] = useState({
    price: 0,
    event_date: '',
    quantity: 1,
  });
  const [selectedTicketType, setSelectedTicketType] = useState('Взрослый билет');
  const [isTicketSuccessModalOpen, setIsTicketSuccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const ticketTypes = ['Детский билет', 'Льготный билет', 'Взрослый билет'];

  // Функция для корректировки времени на 5 часов
  const adjustTime = (dateString) => {
    const date = new Date(dateString);
    date.setHours(date.getHours() + 5); // Добавляем 5 часов
    return date.toISOString().slice(0, 16); // Возвращаем в формате datetime-local
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin');
    }
  }, [navigate]);

  const location = useLocation();
  const isCreateEventPage = location.pathname === '/admin/create/event';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const authHeader = `Basic ${btoa('admin:admin')}`;

        const [eventsResponse, categoriesResponse, locationsResponse, genresResponse, tagsResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/event/all?offset=0&limit=100`, {
            headers: { Authorization: authHeader },
          }),
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

        if (!eventsResponse.ok || !categoriesResponse.ok || !locationsResponse.ok || !genresResponse.ok || !tagsResponse.ok) {
          throw new Error('Ошибка при загрузке данных');
        }

        const [eventsData, categoriesData, locationsData, genresData, tagsData] = await Promise.all([
          eventsResponse.json(),
          categoriesResponse.json(),
          locationsResponse.json(),
          genresResponse.json(),
          tagsResponse.json(),
        ]);

        setEvents(eventsData.items);
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

  const handleEdit = async (id) => {
    try {
      const authHeader = `Basic ${btoa('admin:admin')}`;
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/event/${id}`, {
        headers: { Authorization: authHeader },
      });

      if (!response.ok) {
        throw new Error('Ошибка при загрузке данных мероприятия');
      }

      const data = await response.json();
      setSelectedEvent(data.event);
      setSelectedEventTickets([data.ticket_booked, data.ticket_sold])

      // Загружаем доступные билеты для выбранного мероприятия
      const ticketsResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/ticket/avaliable/${id}`, {
        headers: { Authorization: authHeader },
      });

      if (!ticketsResponse.ok) {
        throw new Error('Ошибка при загрузке доступных билетов');
      }

      const ticketsData = await ticketsResponse.json();

      if (ticketsData.length > 0) {
        // Находим ближайшую дату и минимальную цену
        const nearestTicket = ticketsData.reduce((prev, curr) => {
          return new Date(curr.event_date) < new Date(prev.event_date) ? curr : prev;
        });

        setTicketData({
          price: nearestTicket.price,
          event_date: adjustTime(nearestTicket.event_date), // Используем функцию для корректировки времени
          quantity: 1,
        });
      }
    } catch (error) {
      setError(error.message || 'Ошибка');
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedEventId(id);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      const authHeader = `Basic ${btoa('admin:admin')}`;
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/event/${selectedEventId}`, {
        method: 'DELETE',
        headers: { Authorization: authHeader },
      });

      if (!response.ok) {
        throw new Error('Ошибка при удалении мероприятия');
      }

      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== selectedEventId));
      setIsDeleteModalOpen(false);
      setIsSuccessModalOpen(true); // Показываем модалку успешного удаления

      setTimeout(() => {
        setIsSuccessModalOpen(false);
      }, 3000);
    } catch (error) {
      setError(error.message || 'Ошибка');
    }
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSelectedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: checked,
    }));
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedEvent((prevEvent) => {
      const isSelected = prevEvent.visitor_category.some((cat) => cat.id === categoryId);
      if (isSelected) {
        return {
          ...prevEvent,
          visitor_category: prevEvent.visitor_category.filter((cat) => cat.id !== categoryId),
        };
      } else {
        const category = visitorCategories.find((cat) => cat.id === categoryId);
        return {
          ...prevEvent,
          visitor_category: [...prevEvent.visitor_category, category],
        };
      }
    });
  };

  const handleTagChange = (tagId) => {
    setSelectedEvent((prevEvent) => {
      const isSelected = prevEvent.tag.some((t) => t.id === tagId);
      if (isSelected) {
        return {
          ...prevEvent,
          tag: prevEvent.tag.filter((t) => t.id !== tagId),
        };
      } else {
        const tag = tags.find((t) => t.id === tagId);
        return {
          ...prevEvent,
          tag: [...prevEvent.tag, tag],
        };
      }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSave = async () => {
    try {
      const authHeader = `Basic ${btoa('admin:admin')}`;

      // Сохраняем изменения мероприятия
      const saveEventResponse = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/event/${selectedEvent.id}`, {
        method: 'PUT',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: selectedEvent.name,
          description: selectedEvent.description,
          disabilities: selectedEvent.disabilities,
          location_id: selectedEvent.location.id,
          genre_id: selectedEvent.genre.id,
          visitor_category: selectedEvent.visitor_category.map((cat) => cat.id),
          tag: selectedEvent.tag.map((t) => t.id),
          price: selectedEvent.price,
        }),
      });

      if (!saveEventResponse.ok) {
        throw new Error('Ошибка при сохранении мероприятия');
      }

      // Если файл был выбран, загружаем его
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        const uploadLogoResponse = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/admin/event/${selectedEvent.id}/upload_logo`,
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

      // Открываем модальное окно успешного обновления
      setIsUpdateSuccessModalOpen(true);

      // Через 3 секунды закрываем модальное окно
      setTimeout(() => {
        setIsUpdateSuccessModalOpen(false);
      }, 3000);
    } catch (error) {
      setError(error.message || 'Ошибка');
    }
  };

  const handleAddTicketClick = () => {
    setIsAddTicketModalOpen(true);
  };

  const handleTicketInputChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleTicketTypeChange = (type) => {
    setSelectedTicketType(type);
  };

  const handleCreateTicket = async () => {
    try {
      const authHeader = `Basic ${btoa('admin:admin')}`;
      const formattedDate = new Date(ticketData.event_date).toISOString().slice(0, 19).replace('T', ' ');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/admin/ticket`, {
        method: 'POST',
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: selectedEvent.id,
          type: selectedTicketType,
          price: ticketData.price,
          event_date: formattedDate,
          quantity: ticketData.quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании билета');
      }

      setIsAddTicketModalOpen(false);
      setIsTicketSuccessModalOpen(true);

      setTimeout(() => {
        setIsTicketSuccessModalOpen(false);
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
          ) : selectedEvent ? (
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
                      value={selectedEvent.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Дата и время <span className="required">*</span>
                    </label>
                    <input
                      type="datetime-local"
                      name="date"
                      value={ticketData.event_date}
                      onChange={handleInputChange}
                      style={{ marginLeft: '10px' }}
                      disabled // Блокируем изменение даты
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Адрес <span className="required">*</span>
                    </label>
                    <select
                      name="location_id"
                      value={selectedEvent.location.id}
                      onChange={handleInputChange}
                      className="styled-select"
                    >
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
                      value={selectedEvent.guide}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>
                      Цена, руб <span className="required">*</span>
                    </label>
                    <input
                      type="number"
                      name="price"
                      value={ticketData.price}
                      onChange={handleInputChange}
                      disabled
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
                          checked={selectedEvent.disabilities}
                          onChange={handleCheckboxChange}
                        />
                        Да
                      </label>
                      <label>
                        <input
                          type="checkbox"
                          name="disabilities"
                          checked={!selectedEvent.disabilities}
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
                      value={selectedEvent.genre.id}
                      onChange={handleInputChange}
                      className="styled-select"
                    >
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
                            checked={selectedEvent.visitor_category.some((cat) => cat.id === category.id)}
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
                          className={`tag ${selectedEvent.tag.some((t) => t.id === tag.id) ? 'selected' : ''}`}
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
                      value={selectedEvent.description}
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
                    <button className="save-button" onClick={handleSave}>
                      Сохранить
                    </button>
                  </div>
                </div>
                <div className="tickets-info">
                  <h2>Билеты</h2>
                  <h3>{selectedEvent.name}</h3>
                  <p>{ticketData.event_date.replace('T', ' ')}</p>
                  <div className="tickets-stats">
                    <p>Куплено: {selectedEventTickets[0]}</p>
                    <p>Забронировано: {selectedEventTickets[1]}</p>
                  </div>
                  <button className="add-ticket-button" onClick={handleAddTicketClick}>
                    Добавить билеты
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="events-list">
              {events.map((event) => (
                <div key={event.id} className="event-item">
                  <span className="event-name">{event.name}</span>
                  <div className="event-actions">
                    <button onClick={() => handleEdit(event.id)}>
                      <img src={editIcon} alt="Edit" width={25} height={25} />
                    </button>
                    <button onClick={() => handleDeleteClick(event.id)}>
                      <img src={trashIcon} alt="Delete" width={25} height={25} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Вы действительно хотите удалить мероприятие?</p>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={handleDeleteCancel}>
                Отмена
              </button>
              <button className="delete-button" onClick={handleDeleteConfirm}>
                Удалить
              </button>
            </div>
          </div>
        </div>
      )}

      {isSuccessModalOpen && (
        <div className="success-modal">
          <img src={doneIcon} alt="Done" width={30} height={30} />
          <p>Мероприятие успешно удалено</p>
        </div>
      )}

      {isUpdateSuccessModalOpen && (
        <div className="success-modal">
          <img src={doneIcon} alt="Done" width={30} height={30} />
          <p>Мероприятие успешно обновлено</p>
        </div>
      )}

      {isAddTicketModalOpen && (
        <div className="add-ticket-modal-overlay">
          <div className="add-ticket-modal">
            <h2>Создание билета</h2>
            <div className="add-ticket-form-group">
              <label>
                Тип билета <span className="required">*</span>
              </label>
              <div className="ticket-type-checkboxes">
                {ticketTypes.map((type) => (
                  <label key={type}>
                    <input
                      type="checkbox"
                      checked={selectedTicketType === type}
                      onChange={() => handleTicketTypeChange(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
            <div className="add-ticket-form-group">
              <label>
                Цена, руб <span className="required">*</span>
              </label>
              <input
                type="number"
                name="price"
                onChange={handleTicketInputChange}
              />
            </div>
            <div className="add-ticket-form-group">
              <label>
                Дата и время <span className="required">*</span>
              </label>
              <input
                type="datetime-local"
                name="event_date"
                onChange={handleTicketInputChange}
              />
            </div>
            <div className="add-ticket-form-group">
              <label>
                Количество билетов <span className="required">*</span>
              </label>
              <input
                type="number"
                name="quantity"
                value={ticketData.quantity}
                onChange={handleTicketInputChange}
              />
            </div>
            <div className="add-ticket-modal-buttons">
              <button className="add-ticket-cancel-button" onClick={() => setIsAddTicketModalOpen(false)}>
                Отмена
              </button>
              <button className="add-ticket-create-button" onClick={handleCreateTicket}>
                Создать
              </button>
            </div>
          </div>
        </div>
      )}

      {isTicketSuccessModalOpen && (
        <div className="success-modal">
          <img src={doneIcon} alt="Done" width={30} height={30} />
          <p>Билеты успешно добавлены!</p>
        </div>
      )}
    </div>
  );
};

export default AdminEventsPage;