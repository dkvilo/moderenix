
vcl 4.0;

backend default {
  .host = "nginx";
  .port = "80";
  .connect_timeout = 10s;
  .first_byte_timeout = 15s;
  .between_bytes_timeout = 60s;
  .max_connections = 800;
}

sub vcl_recv {
  unset req.http.cookie;
}

sub vcl_backend_response{
	# Set 2min cache if unset
	if (beresp.ttl <= 0s) {
    set beresp.ttl = 120s; # Important, you shouldn't rely on this, SET YOUR HEADERS in the backend
    set beresp.uncacheable = false;
    return (deliver);
	 }
	return (deliver);
}

sub vcl_backend_response {
  # Happens after we have read the response headers from the backend.
  #
  # Here you clean the response headers, removing silly Set-Cookie headers
  # and other mistakes your backend does.
}

sub vcl_deliver {
  # Happens when we have all the pieces we need, and are about to send the
  # response to the client.
  #
  # You can do accounting or modifying the final object here.
	if (obj.hits > 0) {
    set resp.http.X-Cache = "HIT";
  } else {
    set resp.http.X-Cache = "MISS";
  }
} 