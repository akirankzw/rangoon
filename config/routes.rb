Rails.application.routes.draw do
  root to: "dashboard#index"

  get :dashboard, controller: :dashboard, action: :index

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  resources :users

  devise_for :teachers, controllers: {
    sessions: 'teachers/sessions',
    registrations: 'teachers/registrations'
  }
  resources :teachers

  resources :lessons, only: [:index, :show, :create]
end
