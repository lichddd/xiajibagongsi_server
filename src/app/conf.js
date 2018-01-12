export default{
  pre_uri:process.env.NODE_ENV=="development"?"http://localhost:8081/":"",
  pre_path:process.env.NODE_ENV=="development"?"./":"/lichddd/",
}
