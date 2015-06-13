<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Api extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	public function index()
	{
		die(json_encode(array(
                    'status' => 'SUCCESS' 
                )));
	}
        
        public function test2(){
            die(json_encode(array(
                'status' => 'O2sK'
            )));
        }
        /*INPUT
         * token
         * product_id
         * quantity
         * 

         */
        public function addToCart(){
           $result =  $this->db->query("addToCart( ?, ?, ?)",array(
               $this->input->post('token'),
               $this->input->post('product_id'),
               $this->input->post('quantity')
           ))->result_array();
            die(json_encode($result));
        }
        
        
        public function getCart(){
            $result = $this->db->query("getCart(? ,?)",array(
                $this->input->post('token'),
                site_url('images')
            ))->result_array();
        }
        
        /*
         * token
         * product_id
         */
        public function getItem(){
            $result = $this->db->query("call getItem( ?, ?, ?)",array(
                $this->input->post('token'),
                $this->input->post('product_id'),
                site_url('images')
            ))->result_array()[0];
            
            if(isset($result['status'])){
                die(json_encode(array(
                    'status' => 'ERROR'
                )));
            }else{
                die(json_encode(array(
                    'status' => 'SUCCESS',
                    'data' => $result
                )));
            }
        }
        /*
         * 
         * 
         */
        public function login(){
            $result = $this->db->query('call login( ?, ?)',array(
                $this->input->post('email'),
                $this->input->post('password')
            ))->result_array();
            
            die(json_encode($result));
        }
        
        /*
         * token
         */
        public function logout(){
            $result = $this->db->query('call logout( ?)',array(
                $this->input->post('token')
            ))->result_array();
            die(json_encode($result));
        }
        
        /*email
         * password
         * name
         * phonenumber
         * 
         */
        public function register(){
            $result = $this->db->query('call register( ?, ?, ?, ?)',array(
                $this->input->post("email"),
                $this->input->post('password'),
                $this->input->post('name'),
                $this->input->post('phonenumber')
            ))->result_array();
            die(json_encode($result));
        }
        
        public function editItem(){
            $result = $this->db->query("call editItem()",array(
                $this->input->post("token"),
                $this->input->post("item_id"),
                $this->input->post("quantity")
            ))->result_array();
        }
}
