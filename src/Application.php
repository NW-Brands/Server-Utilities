<?php namespace NWBrands;

use Illuminate\Http\Request;
use Illuminate\Container\Container;

/**
 * Class Application
 * @package NWBrands
 * @author  Valentin PRUGNAUD <valentin@whatdafox.com>
 * @url http://www.foxted.com
 */
class Application extends Container {

    protected $redirections = [];
    protected $domains = [];
    protected $templates = [];

    /**
     * Boot application
     */
    public function boot()
    {
        $request = Request::createFromGlobals();
        $this['request'] = $request;
    }

    /**
     * Redirect domains
     * @return $this
     */
    public function redirectDomains()
    {
        $domainName = $this['request']->getHost();

        if ( array_key_exists( $domainName, $this->redirections ) )
        {
            header( "HTTP/1.1 301 Moved Permanently" );
            header( "Location: ".$this->redirections[ $domainName ] );
            die;
        }

        return $this;
    }

    /**
     * Try to show a domain specific page
     * @return $this
     */
    public function showDomainTemplates()
    {
        $domainName = $this['request']->getHost();
        if ( in_array( $domainName, $this->domains ) )
        {
            include 'domains/' . $domainName . '.html';
            die;
        }

        return $this;
    }

    /**
     * Try to show a template page
     * If no template name is provided, it will try a "template" query string
     * @param null $templateName
     * @return $this
     */
    public function showTemplate($templateName = NULL)
    {
        if(is_null($templateName)) $templateName = $this['request']->get( 'template' );

        if ( in_array( $templateName, $this->templates ) )
        {
            include 'templates/' . $templateName . '.html';
            die;
        }

        return $this;
    }

    /**
     * Show the default page
     */
    public function showDefault()
    {
        $this->showTemplate("404");
    }

    /**
     * Setup the domains that needs a 301 redirection
     * @param array $redirections
     */
    public function registerRedirectedDomains( $redirections = [ ] )
    {
        $this->redirections += $redirections;
    }

    /**
     * Setup the available domains template for the app
     * @param array $domains
     */
    public function registerDomainTemplates($domains = [])
    {
        $this->domains += $domains;
    }

    /**
     * Setup the available templates for the app
     * @param array $templates
     */
    public function registerTemplates( $templates = [ ] )
    {
        $this->templates += $templates;
    }


}