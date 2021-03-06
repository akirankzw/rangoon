Rails.application.routes.draw do
  root to: 'dashboard#index'

  mount ActionCable.server => '/cable'

  get :dashboard, controller: :dashboard, action: :index

  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations',
    passwords: 'users/passwords',
    confirmations: 'user/confirmations'
  }

  namespace :admin do
    resources :users, only: [:index]
    resources :teachers, only: :none do
      collection do
        get  'dashboard', action: :index
        get  'profile',   action: :show
        post 'profile',   action: :update
      end
    end
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

  namespace 'users' do
    resources :notes, only: [:show]
  end

  resources :teachers, only: [:index, :show]
  resources :lessons, only: [:index, :create] do
    collection do
      get 'today', action: :today
    end
  end
  resources :books, except: [:edit]
  resources :notes, only: [:show, :update, :destroy]
  resources :account_settings, only: [:update]
end
