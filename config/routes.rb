Rails.application.routes.draw do
  root to: 'dashboard#index'

  get :dashboard, controller: :dashboard, action: :index

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'user/confirmations'
  }

  namespace :admin do
    get 'teachers/dashboard', controller: :teachers, action: :index
  end

  scope '/admin' do
    devise_for :teachers, controllers: {
      sessions: 'teachers/sessions',
      registrations: 'teachers/registrations',
      passwords: 'teachers/passwords',
      confirmations: 'teacher/confirmations'
    }
  end

  resources :charges, only: [:new, :create] do
    collection do
      post :webhook
    end
  end
  resources :users
  resources :teachers, only: [:index, :show, :edit, :update]
  resources :lessons, only: [:index, :show, :create]
  resources :books, only: [:index, :show, :create]
end
