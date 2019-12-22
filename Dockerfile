FROM ruby:2.6.5

LABEL maintainer="redwolf89@gmail.com"

RUN apt-get update -yqq
RUN apt-get install -yqq --no-install-recommends build-essential apt-transport-https libpq-dev vim sqlite3 libsqlite3-dev

# Node.js - Note: You need to keep this up-to-date with the version of nodejs you need
# LTS
#RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && apt-get install -y nodejs
# Latest
RUN curl -sL https://deb.nodesource.com/setup_10.x | bash - && apt-get install -y nodejs

# fix npm - apt-get doesn't install the latest version
RUN npm install -g npm

# yarn
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -\
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

# Define an environment variable we will use in the COPY command - this is passed in via the args from docker-compose
#ARG project_dir

# Copy the app's Gemfile(s) into the environment (may change this to have a gem cache later)
#COPY $project_dir/Gemfile* /usr/src/app/
WORKDIR /usr/src/app

RUN yarn install --check-files
RUN gem install bundler:2.0.2
#RUN bundle install

EXPOSE 3000

# Clear out any hanging pids
#ENTRYPOINT ["./docker-entrypoint.sh"]
# Start server (Exec form)
#CMD ["rails", "s", "-b", "0.0.0.0"]

# Launch a shell
ENTRYPOINT ["/bin/bash"]
