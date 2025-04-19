
const InstallInstructions = () => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Installation Steps</h3>
        <ol className="mt-2 space-y-2 pl-6 list-decimal">
          <li>Connect to your Ubuntu 22.04 server via SSH</li>
          <li>Create a new file named <code className="bg-muted px-1 py-0.5 rounded">install.sh</code></li>
          <li>Copy and paste the script into this file</li>
          <li>Make the script executable with: <code className="bg-muted px-1 py-0.5 rounded">chmod +x install.sh</code></li>
          <li>Run the script with: <code className="bg-muted px-1 py-0.5 rounded">sudo ./install.sh</code></li>
          <li>Follow the on-screen instructions</li>
        </ol>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">System Requirements</h3>
        <ul className="mt-2 space-y-2 pl-6 list-disc">
          <li>Ubuntu 22.04 LTS (fresh installation recommended)</li>
          <li>Minimum 2GB RAM</li>
          <li>At least 20GB free disk space</li>
          <li>Root or sudo access</li>
          <li>Public IP address (for internet-facing installations)</li>
        </ul>
      </div>
      
      <div>
        <h3 className="text-lg font-medium">Post-Installation</h3>
        <ul className="mt-2 space-y-2 pl-6 list-disc">
          <li>Change the default admin password immediately</li>
          <li>Configure your domain DNS if you're using a domain name</li>
          <li>Set up SSL certificates for secure connections</li>
          <li>Review and update firewall settings as needed</li>
          <li>Set up automatic backups for your database</li>
        </ul>
      </div>
    </div>
  );
};

export default InstallInstructions;
