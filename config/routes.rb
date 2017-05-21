Rails.application.routes.draw do
  root to: "dashboard#index"

  get :dashboard, controller: :dashboard, action: :index

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'user/confirmations'
  }
  resources :users

  devise_for :teachers, controllers: {
    sessions: 'teachers/sessions',
    registrations: 'teachers/registrations',
    passwords: 'teachers/passwords',
    confirmations: 'teacher/confirmations'
  }
  resources :teachers

  resources :lessons, only: [:index, :show, :create]
end
