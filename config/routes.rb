Rails.application.routes.draw do
  devise_for :teachers
  resources :teachers
  root to: "dashboard#index"
end
