source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end

gem 'rails', '~> 5.1.1'
gem 'mysql2', '>= 0.3.18', '< 0.5'
gem 'puma', '~> 3.7'
gem 'sass-rails', '~> 5.0'
gem 'uglifier', '>= 1.3.0'
gem 'webpacker'
# gem 'therubyracer', platforms: :ruby
gem 'turbolinks', '~> 5'
gem 'jbuilder', '~> 2.5'
# gem 'redis', '~> 3.0'
# gem 'bcrypt', '~> 3.1.7'
gem 'dotenv-rails'
gem 'aws-sdk'
gem 'devise'
gem 'kaminari'
gem 'haml-rails'
gem 'mailgun-ruby'

group :development, :test do
  gem 'byebug', platforms: [:mri, :mingw, :x64_mingw]
end

group :development do
  gem 'capistrano-rails',   require: false
  gem 'capistrano-rbenv',   require: false
  gem 'capistrano3-puma',   require: false

  gem 'web-console', '>= 3.3.0'
  gem 'listen', '>= 3.0.5', '< 3.2'
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'
  gem 'rubocop'
  gem 'bullet'
  gem 'rspec-rails'
  gem 'factory_girl'
end

group :test do
  gem 'simplecov', require: false
end
