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
    resources :users, only: [:index]
  end

  scope '/admin' do
    devise_for :teachers, controllers: {
      sessions: 'teachers/sessions',
      registrations: 'teachers/registrations',
      passwords: 'teachers/passwords',
      confirmations: 'teacher/confirmations'
    }
  end

  resources :subscriptions, only: [:new, :create] do
    collection do
      post :unsubscribe
      post :webhook
    end
  end

  resource :users, only: :none do
    collection do
      get  'dashboard', action: :index
      get  'profile',   action: :show
      post 'profile',   action: :update
    end
  end
  resources :teachers, only: [:index, :show, :edit, :update]
  resources :lessons, only: [:index, :show, :create]
  resources :books, except: [:edit]
end
