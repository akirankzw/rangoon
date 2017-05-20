Rails.application.routes.draw do
  root to: "dashboard#index"
  devise_for :teachers
  resources :teachers do
    resources :lessons
  end
  get :dashboard, controller: :dashboard, action: :index
end
