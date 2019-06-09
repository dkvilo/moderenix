if [ "$NODE_ENV" == "development" ]; then
  yarn run start:dev
elif [ "$NODE_ENV" == "production" ]; then
  yarn start
else
  echo "Unknown NODE_ENV Variable"
fi;